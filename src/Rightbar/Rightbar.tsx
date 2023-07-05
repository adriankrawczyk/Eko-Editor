import React, { useContext } from 'react';
import AddingDropdown from './AddingDropdown';
import { renderNumericInput } from './RightbarUtils';
import { Context } from '../App';

const Rightbar: React.FC = () => {
  return (
    <div className='fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-300'>
      <div className={`flex items-center justify-between p-4 border-b border-gray-200`}>
        <h2 className='text-lg font-semibold'>Settings</h2>
        <div className='flex gap-3'>{<AddingDropdown />}</div>
      </div>
      <div className={`p-4`}>{useContext(Context).rightbarContent}</div>
    </div>
  );
};

export default Rightbar;
