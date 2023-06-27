import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { canvas } from '../Canvas/CanvasInstance';
import CustomObject from '../Canvas/Elements/Logic/CustomObject';
import { mainCard } from '../Canvas/Elements/MainCard/AddBasicCard';
import ReRenderElements from './ReRenderElements';

const DeleteButton: React.FC = () => {
  return (
    <button
      className='bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center'
      onClick={() => {
        const activeObj = canvas.getActiveObject() as CustomObject;

        if (activeObj) {
          if (activeObj.text) {
            const iText = activeObj.text as fabric.IText;
            iText.exitEditing();
          }
          canvas.remove(activeObj);
          mainCard['elements'] = mainCard['elements'].filter((element: fabric.Object) => {
            const elementOnCanvas = canvas.getObjects().find((obj) => obj === element);
            return !!elementOnCanvas;
          });

          ReRenderElements(false);
        }
      }}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeleteButton;
