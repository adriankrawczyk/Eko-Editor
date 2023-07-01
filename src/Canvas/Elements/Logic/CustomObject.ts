interface CustomObject extends fabric.Object {
  [x: string]: any;
  shape?: string;
  outline?: fabric.Object;
  text?: fabric.Object;
  card?: fabric.Object;
  parent?: fabric.Object;
  _objects: fabric.Object[];
  date?: Date;
}
export default CustomObject;
