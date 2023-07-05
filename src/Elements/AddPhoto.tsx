import React from 'react';
import { fabric } from 'fabric';
import { canvas } from '../Canvas/CanvasInstance';
import { setMouseIcon } from '../Canvas/MouseIcon';
import { ContextProps } from '../App';
import { renderInput, renderPhoto } from '../Rightbar/RightbarUtils';

const AddPhoto = (context: ContextProps) => {
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.createElement('img');
        imgElement.src = e.target?.result as string;
        imgElement.onload = () => {
          const image = new fabric.Image(imgElement, {
            left: 0,
            top: 0,
          });

          canvas.add(image);
          setMouseIcon(image);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  context.setRightbarContent(
    <>
      {renderPhoto({
        id: 'photoInput',
        label: 'Photo',
        onChange: handlePhotoChange,
      })}
    </>
  );
};

export default AddPhoto;
