import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';
import SetBackgroundMask from './SetBackgroundMask';
import SetObjectPrototype from './SetObjectPrototype';
import { SetCanvas } from './CanvasInstance';
import SetCanvasEvents from './SetCanvasEvents';
import { useContext } from 'react';
import { Context } from '../App';

let canvas: fabric.Canvas;

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useContext(Context);
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const marginX = 200;
      const marginY = 20;
      const width = window.innerWidth - marginX;
      const height = window.innerHeight - marginY;
      canvas = new fabric.Canvas(canvasRef.current, {
        width,
        height,
        selection: false,
      });

      SetObjectPrototype();
      SetCanvas(canvas);
      SetBackgroundMask('#FFF');
      SetCanvasEvents(context);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    fabric.util.addListener(document.getElementsByClassName('upper-canvas')[0] as HTMLElement, 'contextmenu', (e: { preventDefault: () => void }) => {
      e.preventDefault();
    });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
