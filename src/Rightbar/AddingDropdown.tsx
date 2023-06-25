import React, { useState } from 'react';
import AddTextBox from '../Canvas/AddTextBox';
import { canvas } from '../Canvas/CanvasInstance';
import { AddBasicCard, mainCard, setMainCard } from '../Canvas/AddBasicCard';
import AddOutline from '../Canvas/AddOutline';
import GroupWithOutlineEvents from '../Canvas/GroupWithOutlineEvents';
import CustomObject from '../Canvas/CustomObject';

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
        const BORDER_MARGIN = 30;
        const elements = mainCard['elements'];
        const lastElement = elements[elements.length - 1];
        const textBox = AddTextBox(canvas.getWidth() / 2, lastElement.top + TEXT_BOX_HEIGHT * 1.5);
        canvas.add(textBox);
        elements.push(textBox);
        elements.forEach((element: fabric.Group) => {
          if (element.top) {
            element.top -= TEXT_BOX_HEIGHT / 2;
            element.setCoords().addWithUpdate();
          }
        });
        const height = elements.length * TEXT_BOX_HEIGHT + TEXT_BOX_HEIGHT * 0.75;
        mainCard.height = height;
        mainCard.top = (canvas.getHeight() - height) / 2;
        mainCard['remove'](mainCard.outline);
        const outline = AddOutline({ description: 'Body', parent: mainCard });
        mainCard['addWithUpdate'](outline);
        mainCard.outline = outline;
        canvas.remove(mainCard);
        const newMainCard = GroupWithOutlineEvents({ canvas, parent: mainCard, outline }) as CustomObject;
        canvas.add(newMainCard);
        newMainCard.sendToBack();
        if (!newMainCard.outline || !newMainCard.card) return;
        const newTop = (newMainCard.outline.top as number) - BORDER_MARGIN / 2;
        newMainCard.card.set({ height, top: newTop });
        setMainCard(newMainCard);
        canvas.requestRenderAll();
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
