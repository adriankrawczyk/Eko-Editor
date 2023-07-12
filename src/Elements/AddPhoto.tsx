import React from 'react';
import { fabric } from 'fabric';
import { canvas } from '../Canvas/CanvasInstance';
import { setMouseIcon } from '../Canvas/MouseIcon';
import { ContextProps } from '../App';
import { renderButton, renderDropdown, renderPhoto } from '../Rightbar/RightbarUtils';
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
        image.set({ clipPath: getClipPath(image, context) });
        setMouseIcon(image, context, true);
        canvas.add(image);
      };
    };
    reader.readAsDataURL(file);
  }
};
const getClipPath = (image: fabric.Image, context: ContextProps) => {
  let clipPath;
  if (context.photoType === 'Circular') {
    clipPath = new fabric.Circle({
      radius: (image.width as number) / 2,
      left: 0,
      top: 0,
    });
  } else {
    clipPath = new fabric.Rect({
      width: image.width,
      height: image.height,
      left: 0,
      top: 0,
    });
  }
  return clipPath;
};
const setPhotoRightbar = (context: ContextProps) => {
  canvas.discardActiveObject();

  const handlePhotoTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    context.photoType = event.target.value;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'image') {
      const image = activeObject as fabric.Image;

      // TO CHANGE
      image.set({ width: (image.width as number) + 1 });
      image.set({ width: (image.width as number) - 1 });
      image.set({ clipPath: getClipPath(image, context) });
      setMouseIcon(image, context, false);
      canvas.setActiveObject(image);
      canvas.requestRenderAll();
    }
  };

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
        id: 'scaleXInput',
        label: 'Scale X',
        defaultValue: context.scaleX.toString(),
        placeholder: 'Enter size X',
        onChange: (e) => {
          const activeObject = canvas.getActiveObject();
          if (!activeObject) return;
          activeObject.set({ scaleX: parseInt(e.target.value) / 100 });

          setMouseIcon(activeObject, context, false);
        },
      })}
      {renderNumericInput({
        id: 'scaleYInput',
        label: 'Scale Y',
        defaultValue: context.scaleY.toString(),
        placeholder: 'Enter size Y',
        onChange: (e) => {
          const activeObject = canvas.getActiveObject();
          if (!activeObject) return;
          activeObject.set({ scaleY: parseInt(e.target.value) / 100 });
          setMouseIcon(activeObject, context, false);
        },
      })}
      {renderDropdown({
        id: 'photoType',
        label: 'Photo type',
        options: ['Rectangular', 'Circular'],
        defaultValue: context.photoType,
        onChange: handlePhotoTypeChange,
      })}
      {renderButton({
        id: 'myButton',
        label: 'Apply',
        onClick: () => {
          canvas.discardActiveObject();
          setMouseIcon(null, context, false);
          context.setRightbarContent(<></>);
          canvas.requestRenderAll();
        },
      })}
    </>
  );
};

const AddPhoto = (context: ContextProps) => {
  setPhotoRightbar(context);
};

export { AddPhoto, setPhotoRightbar };
