interface CustomObjectOptions extends fabric.IGroupOptions {
  shape: string;
  toEdit?: fabric.Object;
  card?: fabric.Object;
  parent?: fabric.Object;
  outline: fabric.Object;
}
export default CustomObjectOptions;
