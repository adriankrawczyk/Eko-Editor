import React, { useContext } from 'react';
import AddingDropdown from './AddingDropdown';
import { Context } from '../App';
import SetBackgroundMask from '../Canvas/SetBackgroundMask';
import { renderColorInput } from './RightbarUtils';
import { mouseIcon } from '../Canvas/MouseIcon';

const Rightbar: React.FC = () => {
  const context = useContext(Context);

  return (
    <div className='fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-300'>
      <div className={`flex items-center justify-between p-4 border-b border-gray-200`}>
        <h2 className='text-lg font-semibold'>Settings</h2>

        <div className='flex gap-3'>
          <AddingDropdown />
        </div>
      </div>
      <div className={`p-4`}>
        {!mouseIcon
          ? renderColorInput({
              id: 'canvasColor',
              label: 'Canvas color:',
              defaultValue: context.canvasColor,
              onChange: (e) => {
                SetBackgroundMask(e.target.value);
                context.setCanvasColor(e.target.value);
              },
            })
          : null}
        {context.rightbarContent}
      </div>
    </div>
  );
};

export default Rightbar;
