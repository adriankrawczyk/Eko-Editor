import React, { createContext, useState } from 'react';
import { fabric } from 'fabric';
import Canvas from './Canvas/Canvas';
import Rightbar from './Rightbar/Rightbar';
import './index.css';
import CustomObject from './Canvas/CustomObject';
import CustomObjectOptions from './Canvas/CustomObjectOptions';

interface FabricContextProps {
  activeObj: CustomObject;
  setActiveObj: React.Dispatch<React.SetStateAction<CustomObject>>;
}

export const FabricContext = createContext<FabricContextProps>({} as FabricContextProps);

const App: React.FC = () => {
  const [activeObj, setActiveObj] = useState<CustomObject>(new fabric.Object({ shape: 'none' } as CustomObjectOptions));
  const fabricContextValue: FabricContextProps = {
    activeObj,
    setActiveObj,
  };

  return (
    <div className='flex'>
      <FabricContext.Provider value={fabricContextValue}>
        <Canvas />
        <Rightbar />
      </FabricContext.Provider>
    </div>
  );
};

export default App;
