import React, { useState, useContext } from 'react';
import { FabricContext } from '../App';
import AddingDropdown from './AddingDropdown';
import DeleteButton from './DeleteButton';
import ArrowButton from './ArrowButton';
import { canvas } from '../Canvas/CanvasInstance';
import { mainCard } from '../Canvas/Elements/MainCard/AddBasicCard';

const Rightbar: React.FC = () => {
  const fabricContext = useContext(FabricContext);
  const hideButtons = () => {
    if (!canvas) return true;
    const activeObject = canvas.getActiveObject();
    const hide = !activeObject || activeObject === mainCard;
    return hide;
  };

  return (
    <div className='fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-300'>
      <div className={`flex items-center justify-between p-4 border-b border-gray-200`}>
        <h2 className='text-lg font-semibold'>Settings</h2>
        <div className='flex gap-3'>
          <AddingDropdown />
          {!hideButtons() && <ArrowButton isUp={true} />}
          {!hideButtons() && <ArrowButton isUp={false} />}
          {!hideButtons() && <DeleteButton />}
        </div>
      </div>
      <div className={`p-4`}>{fabricContext.rightbarContent}</div>
    </div>
  );
};

export default Rightbar;
