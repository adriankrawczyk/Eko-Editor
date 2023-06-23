interface CustomObject extends fabric.Object {
  shape?: string;
  outline?: fabric.Object;
  text?: fabric.Object;
  card?: fabric.Object;
  _objects: fabric.Object[];
}
export default CustomObject;
