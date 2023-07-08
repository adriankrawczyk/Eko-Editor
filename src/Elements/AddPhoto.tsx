import React from 'react';
import { fabric } from 'fabric';
import { canvas } from '../Canvas/CanvasInstance';
import { setMouseIcon } from '../Canvas/MouseIcon';
import { ContextProps } from '../App';
import { renderButton, renderPhoto } from '../Rightbar/RightbarUtils';
import { renderNumericInput } from '../Rightbar/RightbarUtils';
import { mouseIcon } from '../Canvas/MouseIcon';

const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>, context: ContextProps) => {
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
          opacity: 0,
        });
        image.scaleToWidth(100);

        canvas.add(image);
        setMouseIcon(image, context);
      };
    };
    reader.readAsDataURL(file);
  }
};

const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>, context: ContextProps) => {
  const newSize = parseInt(event.target.value);
  context.size = newSize;
  const image = mouseIcon as fabric.Image;
  if (image) {
    const scaleRatio = newSize / (image.width as number);
    const newHeight = (image.height as number) * scaleRatio;
    image.scaleToWidth(newSize);
    image.scaleToHeight(newHeight);
    canvas.renderAll();
  }
};
const setPhotoRightbar = (context: ContextProps) => {
  context.setRightbarContent(
    <>
      {renderPhoto({
        id: 'photoInput',
        label: 'Photo',
        onChange: (e) => {
          handlePhotoChange(e, context);
        },
      })}
      {renderNumericInput({
        id: 'sizeInput',
        label: 'Size',
        defaultValue: context.size.toString(),
        placeholder: 'Enter size',
        onChange: (e) => {
          handleSizeChange(e, context);
        },
      })}
      {renderButton({
        id: 'myButton',
        label: 'Apply',
        onClick: () => {
          context.setRightbarContent(<></>);
        },
      })}
    </>
  );
};
const AddPhoto = (context: ContextProps) => {
  setPhotoRightbar(context);
};
// eslint-disable-next-line react-refresh/only-export-components
export { AddPhoto, setPhotoRightbar };
