/* eslint-disable react-hooks/exhaustive-deps */
import { fabric } from 'fabric';
import { useEffect, useRef, useContext } from 'react';
import SetBackgroundMask from './SetBackgroundMask';
import { AddBasicCard } from './Elements/MainCard/AddBasicCard';
import SetObjectPrototype from './SetObjectPrototype';
import OnSelectionEvents from './Elements/Logic/OnSelectionEvents';
import { setCanvas } from './CanvasInstance';
import { FabricContext } from '../App';
import ReRenderElements from '../Rightbar/ReRenderElements';

let canvas: fabric.Canvas;

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricContext = useContext(FabricContext);

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
      setCanvas(canvas);
      SetBackgroundMask(canvas);
      AddBasicCard(canvas);
      OnSelectionEvents(canvas, fabricContext);
      ReRenderElements(true);
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
