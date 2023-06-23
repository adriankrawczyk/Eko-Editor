import { fabric } from 'fabric';
import CustomObject from './CustomObject';

const handleSelection = (selectedObject: CustomObject, setActiveObject: React.Dispatch<React.SetStateAction<fabric.Object>>) => {
  if (!selectedObject) return;
  setActiveObject(selectedObject);
  switch (selectedObject.shape) {
    case 'text':
      break;
    default:
      break;
  }
};

const OnSelectionEvents = (canvas: fabric.Canvas, setActiveObject: React.Dispatch<React.SetStateAction<fabric.Object>>) => {
  canvas.on('selection:created', (e) => {
    if (e.selected) handleSelection(e.selected[0] as CustomObject, setActiveObject);
  });
  canvas.on('selection:updated', (e) => {
    if (e.selected) handleSelection(e.selected[0] as CustomObject, setActiveObject);
  });
};
export default OnSelectionEvents;
