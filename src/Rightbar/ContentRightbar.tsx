import React from 'react';
import { renderDropdown, renderColor } from './RightbarUtils';
import { canvas } from '../Canvas/CanvasInstance';
import AddContentBox from '../Canvas/Elements/ContentBox/AddContentBox';
import MainObject from '../Canvas/Elements/MainCard/MainObject';
import CustomObject from '../Canvas/Elements/Logic/CustomObject';

interface ContentRightbarProps {
  width: number;
  height: number;
}
let axis = 'horizontal';
const ContentRightbar = (contentProps: ContentRightbarProps) => {
  const handleDropdownChange = (value: string) => {
    const activeObject = canvas.getActiveObject() as MainObject;

    if (value === '1' || !canvas.width || !canvas.height) return;

    if (activeObject.elements) {
      activeObject.elements.forEach((element) => {
        canvas.remove(element);
      });
    }

    activeObject.elements = [];

    const activeLeft = activeObject.left as number;
    const activeTop = activeObject.top as number;
    const activeWidth = (activeObject['_objects'][0] as CustomObject).width as number;
    const activeHeight = activeObject.height as number;

    for (let i = 0; i < parseInt(value, 10); i++) {
      let left, top, boxWidth, boxHeight;
      if (axis === 'horizontal') {
        boxWidth = activeWidth / parseInt(value, 10);
        boxHeight = activeHeight;
        left = activeLeft + boxWidth * i + boxWidth / 2;
        top = activeTop + activeHeight / 2;
      } else {
        boxWidth = activeWidth;
        boxHeight = activeHeight / parseInt(value, 10);
        left = activeLeft + activeWidth / 2;
        top = activeTop + boxHeight * i + boxHeight / 2;
      }
      const contentBox = AddContentBox(left, top, boxWidth, boxHeight, activeObject) as CustomObject;

      activeObject.elements.push(contentBox);
      canvas.add(contentBox);
    }

    canvas.renderAll();
  };
  const handlePropertyChange = (property: keyof CustomObject) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value;
    const activeCard = (canvas.getActiveObject() as CustomObject)['_objects'][0] as CustomObject;
    activeCard.set(property, value);
    canvas.requestRenderAll();
  };
  return (
    <>
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
        defaultValue: 'horizontal',
        onChange: (event) => {
          axis = event.target.value;
        },
      })}
      {renderColor({
        id: 'color',
        label: 'Color',
        onChange: handlePropertyChange('fill'),
      })}
    </>
  );
};

export default ContentRightbar;
