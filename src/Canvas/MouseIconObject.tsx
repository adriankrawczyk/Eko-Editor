import { fabric } from 'fabric';

interface MouseIconObject extends fabric.Object {
  moving: boolean;
  resolution: string;
}
export default MouseIconObject;
