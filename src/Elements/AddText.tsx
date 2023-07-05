import { fabric } from 'fabric';
import { canvas } from '../Canvas/CanvasInstance';
import { setMouseIcon } from '../Canvas/MouseIcon';
import { ContextProps } from '../App';
import { renderInput, renderNumericInput } from '../Rightbar/RightbarUtils';
import { mouseIcon } from '../Canvas/MouseIcon';

const AddText = (context: ContextProps) => {
  const text = new fabric.Text(context.textValue, {
    left: 0,
    top: 0,
    width: context.width,
    height: context.height,
    fill: 'blue',
    fontSize: context.fontSize,
    fontFamily: 'arial',
    angle: context.angle,
  });

  canvas.add(text);
  setMouseIcon(text);
  context.setRightbarContent(
    <>
      {renderInput({
        id: 'textValueInput',
        label: 'Text',
        defaultValue: context.textValue,
        placeholder: 'Enter text',
        onChange: (event) => {
          (mouseIcon as fabric.Text)?.set({ text: event.target.value });
          context.setTextValue(event.target.value);
          canvas.requestRenderAll();
        },
      })}
      {renderNumericInput({
        id: 'fontSizeInput',
        label: 'Font Size',
        defaultValue: '32',
        placeholder: 'Enter font size',
        onChange: (event) => {
          (mouseIcon as fabric.Text)?.set({ fontSize: parseInt(event.target.value) });
          context.setFontSize(parseInt(event.target.value));
        },
      })}
      {renderNumericInput({
        id: 'angleInput',
        label: 'Angle',
        defaultValue: '0',
        placeholder: 'Enter angle',
        onChange: (event) => {
          mouseIcon?.set({ angle: parseInt(event.target.value) });
          context.setAngle(parseInt(event.target.value));
        },
      })}
    </>
  );
};

export default AddText;
