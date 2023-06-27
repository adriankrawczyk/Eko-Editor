import React from 'react';
import { renderNumericInput, renderColor } from './RightbarUtils';
import { canvas } from '../Canvas/CanvasInstance';
import CustomObject from '../Canvas/Elements/Logic/CustomObject';

interface ButtonProperties {
  width: number;
  height: number;
  backgroundColor: string;
}

const getButton = (): CustomObject => {
  const activeObj = canvas.getActiveObject() as CustomObject;
  return activeObj['toEdit'] as CustomObject;
};

const ButtonRightbar: React.FC<ButtonProperties> = (buttonProps) => {
  const handlePropertyChange = (property: keyof CustomObject) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value;
    const button = getButton();
    button.set(property, value);
    canvas.requestRenderAll();
  };

  return (
    <>
      {renderColor({
        id: 'buttonColor',
        label: 'Background color',
        onChange: handlePropertyChange('fill'),
      })}
    </>
  );
};

export default ButtonRightbar;
