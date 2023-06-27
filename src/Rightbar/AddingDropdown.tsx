import React, { useState } from 'react';
import ReRenderElements from './ReRenderElements';
import { mainCard } from '../Canvas/Elements/MainCard/AddBasicCard';
import AddTextBox from '../Canvas/Elements/TextBox/AddTextBox';
import { canvas } from '../Canvas/CanvasInstance';
import AddButtonBox from '../Canvas/Elements/ButtonBox/AddButtonBox';

const AddingDropdown: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleAddButtonClick = () => {
    setMenuVisible(!menuVisible);
  };
  const addElement = (type: string) => {
    const elements = mainCard['elements'];
    const lastElement = elements[elements.length - 1];
    let newElement;
    if (type === 'text') {
      const TEXT_BOX_HEIGHT = 200;
      newElement = AddTextBox(canvas.getWidth() / 2, lastElement.top + TEXT_BOX_HEIGHT * 1.5);
    } else if (type === 'button') {
      const BUTTON_BOX_HEIGHT = 200;
      const BUTTON_WIDTH = 100;
      newElement = AddButtonBox(canvas.getWidth() / 2, lastElement.top + BUTTON_BOX_HEIGHT * 1.5);
    }
    if (newElement) {
      canvas.add(newElement);
      elements.push(newElement);
      ReRenderElements(true);
    }
  };

  const options = [
    {
      text: 'Text',
      onClick: () => addElement('text'),
    },
    {
      text: 'Button',
      onClick: () => addElement('button'),
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
