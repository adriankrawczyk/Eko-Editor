import { fabric } from 'fabric';

export let canvas: fabric.Canvas;

export const SetCanvas = (newCanvas: fabric.Canvas) => {
  canvas = newCanvas;
};
