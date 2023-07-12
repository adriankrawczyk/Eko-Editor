import { fabric } from 'fabric';
import { canvas } from '../Canvas/CanvasInstance';
import { renderButton, renderDropdown, renderNumericInput } from '../Rightbar/RightbarUtils';
import { ContextProps } from '../App';
import { mouseIcon, setMouseIcon } from '../Canvas/MouseIcon';
import MouseIconOptions from '../Canvas/MouseIconOptions';

const AddContentBox = (context: ContextProps) => {
  canvas.discardActiveObject();

  const rect = new fabric.Rect({
    width: context.width,
    height: context.height,
    fill: 'transparent',
    strokeWidth: 1,
    stroke: 'blue',
    left: 0,
    top: 0,
    opacity: 0,
  });

  canvas.add(rect);
  setMouseIcon(rect, context, true);
};
const setWidthAndHeight = (height: number, width: number, resolution: string, context: ContextProps) => {
  const activeObject = canvas.getActiveObject();
  activeObject?.set({ width, height, resolution } as MouseIconOptions);
  setMouseIcon(activeObject, context, false);
};
const setContextBoxRightbar = (context: ContextProps) => {
  context.setRightbarContent(
    <>
      {renderNumericInput({
        id: 'widthInput',
        label: 'Width',
        defaultValue: context.width.toString(),
        placeholder: 'Enter width',
        onChange: (event) => {
          const activeObject = canvas.getActiveObject();
          activeObject?.set({ width: parseInt(event.target.value) });
          setMouseIcon(activeObject, context, false);
        },
      })}
      {renderNumericInput({
        id: 'heightInput',
        label: 'Height',
        defaultValue: context.height.toString(),
        placeholder: 'Enter height',
        onChange: (event) => {
          const activeObject = canvas.getActiveObject();
          activeObject?.set({ height: parseInt(event.target.value) });
          setMouseIcon(activeObject, context, false);
        },
      })}
      {renderDropdown({
        id: 'resolutions',
        label: 'Resolutions',
        options: ['1:1', '4:3', '16:9', 'A3', 'A4', 'A5', 'A6'],
        defaultValue: context.resolution,
        onChange: (event) => {
          const averageDimension = context.height;
          const resolution = event.target.value;
          switch (resolution) {
            case '1:1': {
              setWidthAndHeight(averageDimension, averageDimension, resolution, context);
              break;
            }
            case '4:3': {
              setWidthAndHeight(averageDimension, averageDimension * 0.75, resolution, context);
              break;
            }
            case '16:9': {
              setWidthAndHeight(averageDimension, averageDimension * 0.5625, resolution, context);
              break;
            }
            case 'A3': {
              setWidthAndHeight(420, 297, resolution, context);
              break;
            }
            case 'A4': {
              setWidthAndHeight(297, 210, resolution, context);
              break;
            }
            case 'A5': {
              setWidthAndHeight(210, 148, resolution, context);
              break;
            }
            case 'A6': {
              setWidthAndHeight(148, 105, resolution, context);
              break;
            }
          }
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
export { AddContentBox, setContextBoxRightbar };
