import { fabric } from 'fabric';
import AddOutline from './AddOutline';
import GroupWithOutlineEvents from './GroupWithOutlineEvents';
import CustomObjectOptions from './CustomObjectOptions';
import { canvas } from './CanvasInstance';

const AddTextBox = (left: number, top: number) => {
  const textBoxWidth = 700;
  const textBoxHeight = 200;

  const defaultText = 'Text...';
  const textBox = new fabric.Rect({
    width: textBoxWidth,
    height: textBoxHeight,
    fill: 'white',
    left: left - textBoxWidth / 2,
    top: top - textBoxHeight / 2,
  });
  const iTextFontSize = 40;
  const iText = new fabric.IText(defaultText, {
    left: left - textBoxWidth / 2 + iTextFontSize,
    top,
    fontSize: iTextFontSize,
    editable: true,
  });
  const outline = AddOutline({ parent: textBox, description: 'Text' });

  const textBoxGroup = new fabric.Group([textBox, outline], {
    shape: 'text',
    text: iText,
    outline,
  } as CustomObjectOptions);
  textBoxGroup.addWithUpdate(iText);
  const textBoxGroupWithEvents = GroupWithOutlineEvents({ canvas, parent: textBoxGroup, outline });

  canvas.on('mouse:down', () => {
    if (canvas.getActiveObject() === textBoxGroupWithEvents) return;
    iText.exitEditing();
  });
  textBoxGroup.on('mousedown', () => {
    if (iText.text === defaultText) iText.set({ text: '' });
    iText.enterEditing();
    canvas.renderAll();
  });
  iText.onInput = (e: InputEvent) => {
    const prevText = iText.text as string;
    const cursorPosition = iText.selectionStart as number;
    let newText: string;
    if (e.inputType === 'deleteContentBackward' && cursorPosition > 0) {
      newText = prevText.slice(0, cursorPosition - 1) + prevText.slice(cursorPosition);
      iText.set({
        selectionStart: cursorPosition - 1,
        selectionEnd: cursorPosition - 1,
      });
    } else if (e.data) {
      newText = prevText.slice(0, cursorPosition) + e.data + prevText.slice(cursorPosition);
      iText.set({
        selectionStart: cursorPosition + 1,
        selectionEnd: cursorPosition + 1,
      });
    } else {
      if (e.inputType === 'insertText') iText.exitEditing();
      newText = prevText;
      e.preventDefault();
    }

    iText.set({ text: newText });
    canvas.renderAll();
  };

  return textBoxGroupWithEvents;
};

export default AddTextBox;
