import React from 'react';
import { renderNumericInput, renderColor } from './RightbarUtils';
import { FabricContextProps } from '../App';
import { canvas } from '../Canvas/canvasInstance';
import CustomObject from '../Canvas/CustomObject';

interface CardProperties {
  width: number;
  height: number;
  color: string;
}

const getCard = (): CustomObject => {
  const activeObj = canvas.getActiveObject() as CustomObject;
  return activeObj.card as CustomObject;
};

const CardRightbar = (cardProps: CardProperties) => {
  const handlePropertyChange = (property: keyof CustomObject) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value;
    const activeCard = getCard();
    activeCard.set(property, value);
    canvas.requestRenderAll();
  };

  return (
    <>
      {renderColor({
        id: 'color',
        label: 'Color',
        onChange: handlePropertyChange('fill'),
      })}
    </>
  );
};

export default CardRightbar;
