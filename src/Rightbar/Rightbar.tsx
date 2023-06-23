import React, { useState, useContext } from 'react';
import { renderDynamicInput, renderDynamicDropdown, renderDynamicSlider, renderDynamicColor } from './RightbarUtils';
import { FabricContext } from '../App';

const Rightbar: React.FC = () => {
  const fabricContext = useContext(FabricContext);
  return (
    <div className='fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-300'>
      <div className={`flex items-center justify-between p-4 border-b border-gray-200`}>
        <h2 className='text-lg font-semibold'>Settings</h2>
      </div>
      <div className={`p-4`}>
        <p className='text-gray-600 mb-4'>{fabricContext.activeObj.shape}</p>
      </div>
    </div>
  );
};

export default Rightbar;
