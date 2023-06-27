import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { mainCard } from '../Canvas/Elements/MainCard/AddBasicCard';
import { canvas } from '../Canvas/CanvasInstance';
import CustomObject from '../Canvas/Elements/Logic/CustomObject';
import ReRenderElements from './ReRenderElements';

interface ArrowButtonProps {
  isUp: boolean;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ isUp }) => {
  const handleButtonClick = () => {
    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject === mainCard) return;
    const elements = mainCard['elements'];
    const activeIndex = elements.findIndex((element: CustomObject) => element === activeObject);
    if (activeIndex < 0) return;
    if (isUp && activeIndex > 0) {
      const temp = elements[activeIndex - 1];
      elements[activeIndex - 1] = activeObject;
      elements[activeIndex] = temp;
    } else if (!isUp && activeIndex < elements.length - 1) {
      const temp = elements[activeIndex + 1];
      elements[activeIndex + 1] = activeObject;
      elements[activeIndex] = temp;
    } else return;
    ReRenderElements(true);
  };

  return (
    <button className='bg-gray-500 hover:bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center' onClick={handleButtonClick}>
      <FontAwesomeIcon icon={isUp ? faArrowUp : faArrowDown} />
    </button>
  );
};

export default ArrowButton;
