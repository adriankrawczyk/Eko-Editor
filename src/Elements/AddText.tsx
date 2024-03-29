import { fabric } from 'fabric';
import { canvas } from '../Canvas/CanvasInstance';
import { setMouseIcon } from '../Canvas/MouseIcon';
import { ContextProps } from '../App';
import { renderButton, renderColorInput, renderInput, renderNumericInput } from '../Rightbar/RightbarUtils';
import { mouseIcon } from '../Canvas/MouseIcon';

const AddText = (context: ContextProps) => {
  canvas.discardActiveObject();
  const text = new fabric.IText(context.textValue, {
    left: 0,
    top: 0,
    width: context.width,
    height: context.height,
    fill: '#0000FF',
    fontSize: context.fontSize,
    fontFamily: 'arial',
    angle: context.angle,
    opacity: 0,
  });
  canvas.add(text);
  text.on('changed', () => {
    setMouseIcon(canvas.getActiveObject(), context, false);
  });
  setMouseIcon(text, context, true);
};
const setTextRightbar = (context: ContextProps) => {
  context.setRightbarContent(
    <>
      {/* {renderNumericInput({
        id: 'fontSizeInput',
        label: 'Font Size',
        defaultValue: context.fontSize.toString(),
        placeholder: 'Enter font size',
        onChange: (event) => {
          (mouseIcon as unknown as fabric.Text)?.set({ fontSize: parseInt(event.target.value) });
          context.fontSize = parseInt(event.target.value);
          canvas.requestRenderAll();
        },
      })} */}
      {renderNumericInput({
        id: 'angleInput',
        label: 'Angle',
        defaultValue: context.angle.toString(),
        placeholder: 'Enter angle',
        onChange: (event) => {
          mouseIcon?.set({ angle: parseInt(event.target.value) });
          context.angle = parseInt(event.target.value);
          canvas.requestRenderAll();
        },
      })}
      {renderInput({
        id: 'textValueInput',
        label: 'Text',
        defaultValue: context.textValue,
        placeholder: 'Enter text',
        onChange: (event) => {
          const activeObject = canvas.getActiveObject();
          (activeObject as fabric.Text)?.set({ text: event.target.value });
          setMouseIcon(activeObject, context, false);
          canvas.requestRenderAll();
        },
      })}
      {renderColorInput({
        id: 'textColor',
        label: 'Color:',
        defaultValue: context.textColor,
        onChange: (e) => {
          const activeObject = canvas.getActiveObject();
          const fill = e.target.value.toString();
          activeObject?.set({ fill });
          setMouseIcon(activeObject, context, false);
          canvas.requestRenderAll();
        },
      })}
      {renderButton({
        id: 'myButton',
        label: 'Apply',
        onClick: () => {
          canvas.discardActiveObject();
          setMouseIcon(null, context, false);
          context.setRightbarContent(<></>);
          canvas.requestRenderAll();
        },
      })}
    </>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export { AddText, setTextRightbar };
