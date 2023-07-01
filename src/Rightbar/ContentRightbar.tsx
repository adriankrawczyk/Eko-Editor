import React from 'react';
import { renderDropdown, renderColor, renderNumericInput, renderInput } from './RightbarUtils';
import { canvas } from '../Canvas/CanvasInstance';
import AddContentBox from '../Canvas/Elements/ContentBox/AddContentBox';
import CustomObject from '../Canvas/Elements/Logic/CustomObject';
import getAbsolutePosition from '../Canvas/Elements/Logic/GetAbsolutePositions';
import { fabric } from 'fabric';

interface ContentRightbarProps {
  width: number;
  height: number;
  textLeft: number;
  textTop: number;
}

let axis: string;

const ContentRightbar: React.FC<ContentRightbarProps> = (contentProps) => {
  axis = 'horizontal';

  const handleDropdownChange = (value: string) => {
    const activeObject = canvas.getActiveObject() as CustomObject;

    activeObject.forEachObject((e: fabric.Object, i: number) => {
      if (i > 1) activeObject.remove(e);
    });
    activeObject._objects[0].set({ opacity: 1 });
    canvas.requestRenderAll();

    if (value === '1' || !canvas.width || !canvas.height) return;

    let activeLeft: number, activeTop: number;

    if (activeObject.group) {
      const absolutePosition = getAbsolutePosition(activeObject);
      activeLeft = absolutePosition.left;
      activeTop = absolutePosition.top;
    } else {
      activeLeft = activeObject.left as number;
      activeTop = activeObject.top as number;
    }

    activeObject._objects[0].set({ opacity: 0 });

    const activeWidth = activeObject.width as number;
    const activeHeight = activeObject.height as number;

    for (let i = 0; i < parseInt(value, 10); i++) {
      let left, top, boxWidth, boxHeight;

      if (axis === 'horizontal') {
        boxWidth = activeWidth / parseInt(value, 10);
        boxHeight = activeHeight;
        left = activeLeft + boxWidth * i - (activeObject.width as number) / 2 + boxWidth / 2;
        top = activeTop;
      } else {
        boxWidth = activeWidth;
        boxHeight = activeHeight / parseInt(value, 10);
        left = activeLeft;
        top = activeTop + boxHeight * i - (activeObject.height as number) / 2 + boxHeight / 2;
      }

      const contentBox = AddContentBox(left, top, boxWidth, boxHeight, activeObject) as CustomObject;

      (activeObject as fabric.Group).addWithUpdate(contentBox);
    }

    canvas.renderAll();
  };

  const handleChangeSize = (activeObj: CustomObject, value: number, dimension: 'width' | 'height') => {
    const parsedValue = parseInt(value.toString(), 10) / 100;

    if (!activeObj.group) {
      activeObj.set({ [dimension]: value });
      activeObj._objects[0].set({ [dimension]: value });
      return;
    }

    let oldestObj: CustomObject;
    let oldestObjectDate: number = Number.MAX_VALUE;
    let totalPercentage = 0;
    const groupDimension = activeObj.group[dimension] as number;

    activeObj.group.forEachObject((e) => {
      const object = e as CustomObject;
      if (!object.date || object === activeObj || !activeObj.group) return;
      if (object.date < oldestObjectDate) {
        oldestObjectDate = object.date;
        oldestObj = object;
      }
      totalPercentage += object[dimension] / groupDimension;
    });

    const newDimension = parsedValue * groupDimension;
    const percentageCompensation = 1 - (totalPercentage + parsedValue);
    const compensation = percentageCompensation * groupDimension;

    activeObj.set({ [dimension]: newDimension, date: Date.now() });
    activeObj._objects[0].set({ [dimension]: newDimension });
    oldestObj.set({ [dimension]: oldestObj[dimension] + compensation });
    oldestObj._objects[0].set({ [dimension]: oldestObj._objects[0][dimension] + compensation });

    const group = activeObj.group;
    let cumulativePosition = -group[dimension] / 2;

    group.forEachObject((e) => {
      if (!(e as CustomObject).date) return;
      cumulativePosition += e[dimension] / 2;
      e.set({ [dimension === 'width' ? 'left' : 'top']: cumulativePosition });
      cumulativePosition += e[dimension] / 2;
    });
    group.addWithUpdate().setCoords();
  };

  const getDefaultDimension = (dimension: 'width' | 'height') => {
    let defaultValue: string;
    const activeObject = canvas.getActiveObject();
    if (!activeObject || !activeObject[dimension]) return dimension === 'width' ? 'Width' : 'Height';

    if (activeObject && activeObject.group && activeObject.group[dimension]) {
      defaultValue = Math.floor((activeObject[dimension] / activeObject.group[dimension]) * 100).toString() + '%';
    } else {
      defaultValue = activeObject[dimension].toString();
    }
    return defaultValue;
  };
  const handlePropertyChange = (property: keyof CustomObject) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value;
    const activeText = canvas.getActiveObject().text;
    activeText.set(property, value);
    canvas.requestRenderAll();
  };

  return (
    <>
      {renderInput({
        id: 'width',
        label: 'Width',
        defaultValue: getDefaultDimension('width'),
        placeholder: 'Width percentage',
        onChange: (event) => {
          const value = parseFloat(event.target.value);
          const activeObj = canvas.getActiveObject() as CustomObject;
          handleChangeSize(activeObj, value, 'width');
          canvas.requestRenderAll();
        },
      })}
      {renderInput({
        id: 'height',
        label: 'Height',
        defaultValue: getDefaultDimension('height'),
        placeholder: 'Element Height',
        onChange: (event) => {
          const value = parseInt(event.target.value);
          const activeObj = canvas.getActiveObject() as CustomObject;
          handleChangeSize(activeObj, value, 'height');
          canvas.requestRenderAll();
        },
      })}
      {renderDropdown({
        id: 'elements',
        label: 'Elements',
        options: Array.from({ length: 4 }, (_, index) => ((index + 1) * 1).toString()),
        defaultValue: '1',
        onChange: (event) => {
          handleDropdownChange(event.target.value);
        },
      })}
      {renderDropdown({
        id: 'axis',
        label: 'Axis',
        options: ['horizontal', 'vertical'],
        defaultValue: axis,
        onChange: (event) => {
          axis = event.target.value;
        },
      })}
      {renderInput({
        id: 'description',
        label: 'Description',
        defaultValue: 'Content',
        placeholder: 'Text description',
        onChange: handlePropertyChange('text'),
      })}
      {renderNumericInput({
        id: 'left',
        label: 'Left',
        defaultValue: contentProps.textLeft.toString(),
        placeholder: 'Text Left',
        onChange: handlePropertyChange('left'),
      })}
      {renderNumericInput({
        id: 'top',
        label: 'Top',
        defaultValue: contentProps.textTop.toString(),
        placeholder: 'Text Top',
        onChange: handlePropertyChange('top'),
      })}
      {renderNumericInput({
        id: 'angle',
        label: 'Angle',
        defaultValue: '0',
        placeholder: 'Text Angle',
        onChange: handlePropertyChange('angle'),
      })}
    </>
  );
};

export default ContentRightbar;
