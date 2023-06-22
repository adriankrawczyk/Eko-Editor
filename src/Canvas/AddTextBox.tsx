import { fabric } from 'fabric';
import AddOutline from './AddOutline';
import GroupWithOutlineEvents from './GroupWithOutlineEvents';

const AddTextBox = (canvas: fabric.Canvas) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const textBoxWidth = 600;
  const textBoxHeight = 300;
  const textBoxLeft = (canvasWidth - textBoxWidth) / 2;
  const textBoxTop = (canvasHeight - textBoxHeight) / 2;
  const defaultText = 'Text...';
  const textBox = new fabric.Rect({
    width: textBoxWidth,
    height: textBoxHeight,
    fill: 'white',
    left: textBoxLeft,
    top: textBoxTop,
  });
  const iTextFontSize = 40;
  const iText = new fabric.IText(defaultText, {
    left: textBoxLeft + iTextFontSize / 2,
    top: textBoxTop + textBoxHeight / 2 - iTextFontSize / 2,
    fontSize: iTextFontSize,
    editable: true,
  });
  const outline = AddOutline({ parent: textBox, canvas, description: 'Text' });
  outline.addWithUpdate(iText);
  const textBoxGroup = new fabric.Group([textBox, outline]);
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
