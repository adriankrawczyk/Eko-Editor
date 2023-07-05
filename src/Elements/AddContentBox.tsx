import { fabric } from 'fabric';
import { canvas } from '../Canvas/CanvasInstance';
import { renderNumericInput } from '../Rightbar/RightbarUtils';
import { ContextProps } from '../App';
import { mouseIcon, setMouseIcon } from '../Canvas/MouseIcon';

const AddContentBox = (context: ContextProps) => {
  const rect = new fabric.Rect({
    width: context.width,
    height: context.height,
    fill: 'white',
    strokeWidth: 1,
    stroke: 'blue',
    left: 0,
    top: 0,
  });

  canvas.add(rect);
  context.setRightbarContent(
    <>
      {renderNumericInput({
        id: 'widthInput',
        label: 'Width',
        defaultValue: context.width.toString(),
        placeholder: 'Enter width',
        onChange: (event) => {
          context.setWidth(parseInt(event.target.value));
          mouseIcon?.set({ width: parseInt(event.target.value) });
        },
      })}
      {renderNumericInput({
        id: 'heightInput',
        label: 'Height',
        defaultValue: context.height.toString(),
        placeholder: 'Enter height',
        onChange: (event) => {
          context.setHeight(parseInt(event.target.value));
          mouseIcon?.set({ height: parseInt(event.target.value) });
        },
      })}
    </>
  );
  setMouseIcon(rect);
};

export default AddContentBox;
