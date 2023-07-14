import { canvas } from './CanvasInstance';
import { setMouseIcon, mouseIcon } from './MouseIcon';
import { fabric } from 'fabric';
import StickRect from './StickRect';
import StickText from './StickText';
import { ContextProps } from '../App';

const SetCanvasEvents = (context: ContextProps) => {
  canvas.on('mouse:move', (event) => {
    if (!mouseIcon || !mouseIcon.moving) return;
    mouseIcon.set({ opacity: 1 });

    const pointer = canvas.getPointer(event.e);
    mouseIcon.set({
      left: pointer.x,
      top: pointer.y,
    });
    if (mouseIcon.type === 'rect') StickRect(mouseIcon, pointer);
    else if (mouseIcon.type === 'i-text') StickText(mouseIcon, pointer);
    mouseIcon.setCoords();
    canvas.requestRenderAll();
  });

  canvas.on('selection:updated', (e) => {
    setMouseIcon(e.target as fabric.Object | null, context, false);
  });
  canvas.on('mouse:dblclick', (e) => {
    if (!e.target || e.target.type === 'i-text') return;
    setMouseIcon(e.target as fabric.Object | null, context, true);
  });
  canvas.on('selection:cleared', () => {
    context.setRightbarContent(<></>);
  });
  canvas.on('object:scaling', (e) => {
    const target = e.target;

    if (!target || !e.transform || !e.transform) return;

    setMouseIcon(target, context, false);
    const activeControl = e.transform.corner;
    if (target.type !== 'rect') return;
    convertScale(target);
    canvas.forEachObject((e) => {
      if (e === target) return;
      const eLeft = e.left as number;
      const targetLeft = target.left as number;
      const eTop = e.top as number;
      const targetTop = target.top as number;
      const eWidth = e.width as number;
      const targetWidth = target.width as number;
      const eHeight = e.height as number;
      const targetHeight = target.height as number;
      const whichAxisControl = activeControl === 'mr' || activeControl === 'ml' ? 'x' : 'y';
      const distanceToCenter = whichAxisControl === 'x' ? Math.abs(eLeft - targetLeft) : Math.abs(eTop - targetTop);
      const distanceWithoutGap = whichAxisControl === 'x' ? (eWidth + targetWidth) / 2 : (eHeight + targetHeight) / 2;
      const gap = distanceToCenter - distanceWithoutGap;
      const newTargetDimenion = (whichAxisControl === 'x' ? targetWidth : targetHeight) + gap;
      if (Math.abs(gap) > 10 || Math.abs(gap) < 2) return;
      let newTargetAxisValue = 0;
      switch (activeControl) {
        case 'mr': {
          if (eLeft < targetLeft) return;
          newTargetAxisValue = eLeft - eWidth / 2 - newTargetDimenion / 2;
          break;
        }
        case 'ml': {
          if (eLeft > targetLeft) return;
          newTargetAxisValue = eLeft + eWidth / 2 + newTargetDimenion / 2;
          break;
        }
        case 'mb': {
          if (eTop < targetTop) return;
          newTargetAxisValue = eTop - eHeight / 2 - newTargetDimenion / 2;
          break;
        }
        case 'mt': {
          if (eTop > targetTop) return;
          newTargetAxisValue = eTop + eHeight / 2 + newTargetDimenion / 2;
          break;
        }
      }
      if (whichAxisControl === 'x') target.set({ width: newTargetDimenion, left: newTargetAxisValue });
      else target.set({ height: newTargetDimenion, top: newTargetAxisValue });
    });
    target.set({ strokeWidth: 0 });
  });
  const convertScale = (target: fabric.Object) => {
    const scaleX = target.scaleX as number;
    const scaleY = target.scaleY as number;
    const width = Math.round((target.width as number) * scaleX);
    const height = Math.round((target.height as number) * scaleY);
    target.set({
      width,
      height,
      scaleX: 1,
      scaleY: 1,
      strokeWidth: 1,
    });
    target.setCoords();
  };
  canvas.on('mouse:up', () => {
    const target = canvas.getActiveObject();
    if (target && target.strokeWidth === 0 && target.type === 'rect') {
      convertScale(target);
      setMouseIcon(target, context, false);
    }
  });

  canvas.on('mouse:down', (e) => {
    if (mouseIcon) {
      mouseIcon.setCoords();
      setMouseIcon(null, context, false);
    } else {
      const target = e.target as fabric.Object;
      setMouseIcon(target, context, false);
      if (!mouseIcon) context.setRightbarContent(<></>);
    }
  });

  canvas.on('mouse:wheel', (event) => {
    if (!canvas.viewportTransform || event.e.ctrlKey) return;
    const delta = event.e.deltaY;
    const viewportTransform = canvas.viewportTransform.slice();
    viewportTransform[5] -= delta / 2;
    canvas.setViewportTransform(viewportTransform);
    canvas.requestRenderAll();
    event.e.preventDefault();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete') {
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return;
      canvas.remove(activeObject);
      setMouseIcon(null, context, false);
    }
  });
};

export default SetCanvasEvents;
