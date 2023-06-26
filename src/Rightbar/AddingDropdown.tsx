import React, { useState } from 'react';
import ReRenderElements from './ReRenderElements';
import { mainCard } from '../Canvas/AddBasicCard';
import AddTextBox from '../Canvas/AddTextBox';
import { canvas } from '../Canvas/CanvasInstance';

const AddingDropdown: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleAddButtonClick = () => {
    setMenuVisible(!menuVisible);
  };

  const options = [
    {
      text: 'Text',
      onClick: () => {
        const TEXT_BOX_HEIGHT = 200;
        const elements = mainCard['elements'];
        const lastElement = elements[elements.length - 1];
        const textBox = AddTextBox(canvas.getWidth() / 2, lastElement.top + TEXT_BOX_HEIGHT * 1.5);
        canvas.add(textBox);
        elements.push(textBox);
        ReRenderElements(true);
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
