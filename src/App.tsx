import React, { createContext, useState } from 'react';
import Canvas from './Canvas/Canvas';
import Rightbar from './Rightbar/Rightbar';
import './index.css';

export interface FabricContextProps {
  rightbarContent: JSX.Element;
  setRightbarContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
}

export const FabricContext = createContext<FabricContextProps>({} as FabricContextProps);

const App: React.FC = () => {
  const [rightbarContent, setRightbarContent] = useState<JSX.Element>(<></>);

  const fabricContextValue: FabricContextProps = {
    rightbarContent,
    setRightbarContent,
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
