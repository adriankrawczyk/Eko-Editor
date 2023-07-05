import { fabric } from 'fabric';
import { useEffect, useRef, useContext } from 'react';
import SetBackgroundMask from './SetBackgroundMask';
import SetObjectPrototype from './SetObjectPrototype';
import { SetCanvas } from './CanvasInstance';
import { Context } from '../App';
import SetCanvasEvents from './SetCanvasEvents';

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
      SetBackgroundMask();
      SetCanvasEvents(context);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
