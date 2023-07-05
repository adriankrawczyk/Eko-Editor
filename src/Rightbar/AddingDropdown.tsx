import React, { useState } from 'react';
import AddContentBox from '../Elements/AddContentBox';
import { Context } from '../App';
import { useContext } from 'react';
import AddText from '../Elements/AddText';
import AddPhoto from '../Elements/AddPhoto';

const AddingDropdown: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const context = useContext(Context);

  const handleAddButtonClick = () => {
    setMenuVisible(!menuVisible);
  };

  const options = [
    {
      text: 'Content',
      onClick: () => {
        AddContentBox(context);
      },
    },
    {
      text: 'Text',
      onClick: () => {
        AddText(context);
      },
    },
    {
      text: 'Photo',
      onClick: () => {
        AddPhoto(context);
      },
    },
  ];
  return (
    <div style={{ position: 'relative' }}>
      <button className='bg-gray-500 hover:bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center' onClick={handleAddButtonClick}>
        Add
      </button>
      {menuVisible && (
        <div className='bg-white border border-gray-300 mt-2 p-2' style={{ position: 'absolute', top: '100%', right: 0 }}>
          <ul className='list-none'>
            {options.map((option, index) => (
              <li
                key={index}
                className='cursor-pointer py-1 px-2 hover:bg-gray-100'
                onClick={() => {
                  option.onClick();
                  handleAddButtonClick();
                }}>
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddingDropdown;
