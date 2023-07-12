import MouseIconObject from './MouseIconObject';

interface CanvasObjectOptions extends fabric.ICanvasOptions {
  mouseIcon: MouseIconObject | null;
}
export default CanvasObjectOptions;
