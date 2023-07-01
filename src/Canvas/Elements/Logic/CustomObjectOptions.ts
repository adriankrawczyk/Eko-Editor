interface CustomObjectOptions extends fabric.IGroupOptions {
  shape: string;
  toEdit?: fabric.Object;
  card?: fabric.Object;
  parent?: fabric.Object;
  outline: fabric.Object;
  date?: Date;
}
export default CustomObjectOptions;
