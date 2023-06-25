import CustomObjectOptions from './CustomObjectOptions';
import CustomObject from './CustomObject';

interface MainObjectOptions extends CustomObjectOptions {
  elements: CustomObject[];
}
export default MainObjectOptions;
