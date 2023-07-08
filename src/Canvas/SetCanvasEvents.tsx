import { canvas } from './CanvasInstance';
import { setMouseIcon, mouseIcon } from './MouseIcon';
import { fabric } from 'fabric';
import StickRect from './StickRect';
import StickText from './StickText';
import { ContextProps } from '../App';

const SetCanvasEvents = (context: ContextProps) => {
  canvas.on('mouse:move', (event) => {
    if (!mouseIcon) return;
    mouseIcon.set({ opacity: 1 });

    const pointer = canvas.getPointer(event.e);
    mouseIcon.set({
      left: pointer.x,
      top: pointer.y,
    });
    if (mouseIcon.type === 'rect') StickRect(mouseIcon, pointer);
    else if (mouseIcon.type === 'text') StickText(mouseIcon, pointer);
    canvas.requestRenderAll();
  });

  canvas.on('selection:created', () => {
    canvas.discardActiveObject();
  });

  canvas.on('mouse:down', (e) => {
    if (mouseIcon) {
      mouseIcon.setCoords();
      setMouseIcon(null, context);
    } else {
      const target = e.target as fabric.Object;
      setMouseIcon(target, context);
    }
  });

  canvas.on('mouse:wheel', (event) => {
    if (!canvas.viewportTransform) return;
    const delta = event.e.deltaY;
    const viewportTransform = canvas.viewportTransform.slice();
    viewportTransform[5] -= delta / 2;
    canvas.setViewportTransform(viewportTransform);
    canvas.requestRenderAll();
    event.e.preventDefault();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete') {
      canvas.remove(mouseIcon as fabric.Object);
      setMouseIcon(null, context);
    }
  });
};

export default SetCanvasEvents;
