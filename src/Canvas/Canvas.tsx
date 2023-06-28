/* eslint-disable react-hooks/exhaustive-deps */
import { fabric } from 'fabric';
import { useEffect, useRef, useContext } from 'react';
import SetBackgroundMask from './SetBackgroundMask';
import { AddBasicCard, mainCard } from './Elements/MainCard/AddBasicCard';
import SetObjectPrototype from './SetObjectPrototype';
import OnSelectionEvents from './Elements/Logic/OnSelectionEvents';
import { setCanvas } from './CanvasInstance';
import { FabricContext } from '../App';
import ReRenderElements from '../Rightbar/ReRenderElements';
import AddContentBox from './Elements/ContentBox/AddContentBox';

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
      canvas.add(AddContentBox(canvas.getWidth() / 2 - 50, canvas.getHeight() / 2, width - 200, height - 200));
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
