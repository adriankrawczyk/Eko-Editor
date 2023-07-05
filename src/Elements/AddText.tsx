import { fabric } from 'fabric';
import { canvas } from '../Canvas/CanvasInstance';
import { setMouseIcon } from '../Canvas/MouseIcon';
import { ContextProps } from '../App';
import { renderInput, renderNumericInput } from '../Rightbar/RightbarUtils';
import { mouseIcon } from '../Canvas/MouseIcon';

const AddText = (context: ContextProps) => {
  const text = new fabric.Text('Your text here', {
    left: 0,
    top: 0,
    width: context.width,
    height: context.height,
    fill: 'blue',
    fontSize: 32,
    fontFamily: 'arial',
  });

  canvas.add(text);
  setMouseIcon(text);
  context.setRightbarContent(
    <>
      {renderInput({
        id: 'textValueInput',
        label: 'Text',
        defaultValue: 'Your text here',
        placeholder: 'Enter text',
        onChange: (event) => {
          (mouseIcon as fabric.Text)?.set({ text: event.target.value });
        },
      })}
      {renderNumericInput({
        id: 'fontSizeInput',
        label: 'Font Size',
        defaultValue: '32',
        placeholder: 'Enter font size',
        onChange: (event) => {
          (mouseIcon as fabric.Text)?.set({ fontSize: parseInt(event.target.value) });
        },
      })}
      {renderNumericInput({
        id: 'angleInput',
        label: 'Angle',
        defaultValue: '0',
        placeholder: 'Enter angle',
        onChange: (event) => {
          mouseIcon?.set({ angle: parseInt(event.target.value) });
        },
      })}
    </>
  );
};

export default AddText;
