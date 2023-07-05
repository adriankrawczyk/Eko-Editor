import React, { useContext } from 'react';
import AddingDropdown from './AddingDropdown';
import { renderNumericInput } from './RightbarUtils';
import { Context } from '../App';
import SetBackgroundMask from '../Canvas/SetBackgroundMask';

const Rightbar: React.FC = () => {
  return (
    <div className='fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-300'>
      <div className={`flex items-center justify-between p-4 border-b border-gray-200`}>
        <h2 className='text-lg font-semibold'>Settings</h2>

        <div className='flex gap-3'>
          <AddingDropdown />
        </div>
      </div>

      <div className={`p-4`}>
        <div className='mt-4'>
          <label className='block text-sm font-medium text-gray-700'>Canvas color:</label>
          <input
            type='color'
            defaultValue='#FFFFFF'
            onChange={(e) => {
              SetBackgroundMask(e.target.value);
            }}
            className='mb-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />
        </div>
        {useContext(Context).rightbarContent}
      </div>
    </div>
  );
};

export default Rightbar;
