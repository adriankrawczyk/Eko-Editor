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
      {renderNumericInput({
        id: 'fontSizeInput',
        label: 'Font Size',
        defaultValue: context.fontSize.toString(),
        placeholder: 'Enter font size',
        onChange: (event) => {
          (mouseIcon as fabric.Text)?.set({ fontSize: parseInt(event.target.value) });
          context.setFontSize(parseInt(event.target.value));
          canvas.requestRenderAll();
        },
      })}
      {renderNumericInput({
        id: 'angleInput',
        label: 'Angle',
        defaultValue: context.angle.toString(),
        placeholder: 'Enter angle',
        onChange: (event) => {
          mouseIcon?.set({ angle: parseInt(event.target.value) });
          context.setAngle(parseInt(event.target.value));
          canvas.requestRenderAll();
        },
      })}
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
    </>
  );
};

export default AddText;
