import CustomObject from './CustomObject';

interface MainObject extends CustomObject {
  elements: CustomObject[];
}
export default MainObject;
