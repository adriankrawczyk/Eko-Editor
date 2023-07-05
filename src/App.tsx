import React, { createContext, useState } from 'react';
import Canvas from './Canvas/Canvas';
import './index.css';
import Rightbar from './Rightbar/Rightbar';

export interface ContextProps {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  rightbarContent: React.ReactNode;
  setRightbarContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

export const Context = createContext<ContextProps>({} as ContextProps);

const App: React.FC = () => {
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);

  const [rightbarContent, setRightbarContent] = useState<React.ReactNode>(<></>);

  const contextValue: ContextProps = {
    width,
    setWidth,
    height,
    setHeight,
    rightbarContent,
    setRightbarContent,
  };

  return (
    <div className='flex'>
      <Context.Provider value={contextValue}>
        <Canvas />
        <Rightbar />
      </Context.Provider>
    </div>
  );
};

export default App;
