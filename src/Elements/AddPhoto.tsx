import React from 'react';
import { fabric } from 'fabric';
import { canvas } from '../Canvas/CanvasInstance';
import { setMouseIcon } from '../Canvas/MouseIcon';
import { ContextProps } from '../App';
import { renderPhoto } from '../Rightbar/RightbarUtils';
import { renderNumericInput } from '../Rightbar/RightbarUtils';
import { mouseIcon } from '../Canvas/MouseIcon';

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
          image.scaleToWidth(100);

          canvas.add(image);
          setMouseIcon(image);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value);
    const image = mouseIcon as fabric.Image;
    if (image) {
      const scaleRatio = newSize / (image.width as number);
      const newHeight = (image.height as number) * scaleRatio;
      image.scaleToWidth(newSize);
      image.scaleToHeight(newHeight);
      canvas.renderAll();
    }
  };

  context.setRightbarContent(
    <>
      {renderPhoto({
        id: 'photoInput',
        label: 'Photo',
        onChange: handlePhotoChange,
      })}
      {renderNumericInput({
        id: 'sizeInput',
        label: 'Size',
        defaultValue: context.width.toString(),
        placeholder: 'Enter size',
        onChange: handleSizeChange,
      })}
    </>
  );
};

export default AddPhoto;
