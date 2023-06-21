import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';
import SetBackgroundMask from './SetBackgroundMask';
import AddBasicCard from './AddBasicCard';
import SetObjectPrototype from './SetObjectPrototype';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const margin = 20;
      const width = window.innerWidth - margin;
      const height = window.innerHeight - margin;
      const canvas = new fabric.Canvas(canvasRef.current, {
        width,
        height,
        selection: false,
      });

      SetObjectPrototype();
      SetBackgroundMask(canvas);
      AddBasicCard(canvas);
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
