import { fabric } from 'fabric';

export let canvas: fabric.Canvas;

export const setCanvas = (newCanvas: fabric.Canvas) => {
  canvas = newCanvas;
};
