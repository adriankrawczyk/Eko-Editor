import React, { useState, useContext } from 'react';
import { FabricContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddingDropdown from './AddingDropdown';
const Rightbar: React.FC = () => {
  const fabricContext = useContext(FabricContext);

  return (
    <div className='fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-300'>
      <div className={`flex items-center justify-between p-4 border-b border-gray-200`}>
        <h2 className='text-lg font-semibold'>Settings</h2>
        <AddingDropdown />
      </div>
      <div className={`p-4`}>{fabricContext.rightbarContent}</div>
    </div>
  );
};

export default Rightbar;
