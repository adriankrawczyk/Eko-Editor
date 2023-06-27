interface CustomObject extends fabric.Object {
  [x: string]: any;
  shape?: string;
  outline?: fabric.Object;
  text?: fabric.Object;
  card?: fabric.Object;
  _objects: fabric.Object[];
}
export default CustomObject;
