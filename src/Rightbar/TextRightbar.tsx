import React, { useContext } from 'react';
import { renderNumericInput, renderDropdown, renderColor } from './RightbarUtils';
import { FabricContext, FabricContextProps } from '../App';
import { canvas } from '../Canvas/canvasInstance';
import CustomObject from '../Canvas/CustomObject';
import { IText } from 'fabric/fabric-impl';

interface TextProperties {
  fontSize: number;
  fontFamily: string;
  color: string;
}

const getText = (): IText => {
  const activeObj = canvas.getActiveObject() as CustomObject;
  return activeObj.text as IText;
};

const TextRightbar = (textProps: TextProperties) => {
  const handleTextPropertyChange = (property: keyof IText) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    getText().set(property, event.target.value);
    canvas.requestRenderAll();
  };
  const handlePropertyChange = (property: keyof fabric.Object) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value;
    const activeObj = canvas.getActiveObject() as CustomObject;
    activeObj._objects[0].set(property, value);
    canvas.requestRenderAll();
  };
  return (
    <>
      {renderDropdown({
        id: 'fontSize',
        label: 'Font Size',
        options: Array.from({ length: 25 }, (_, index) => ((index + 1) * 4).toString()),
        defaultValue: textProps.fontSize.toString(),
        onChange: handleTextPropertyChange('fontSize'),
      })}
      {renderDropdown({
        id: 'fontFamily',
        label: 'Font Family',
        options: ['Arial', 'Times New Roman', 'Verdana'],
        defaultValue: textProps.fontFamily,
        onChange: handleTextPropertyChange('fontFamily'),
      })}
      {renderColor({
        id: 'fontColor',
        label: 'Font color',
        onChange: handleTextPropertyChange('fill'),
      })}
      {renderColor({
        id: 'textBoxColor',
        label: 'Box color',
        onChange: handlePropertyChange('fill'),
      })}
    </>
  );
};

export default TextRightbar;
