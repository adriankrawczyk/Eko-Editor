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
  textValue: string;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  angle: number;
  setAngle: React.Dispatch<React.SetStateAction<number>>;
  scaleX: number;
  setScaleX: React.Dispatch<React.SetStateAction<number>>;
  scaleY: number;
  setScaleY: React.Dispatch<React.SetStateAction<number>>;
  resolution: string;
  setResolution: React.Dispatch<React.SetStateAction<string>>;
  photoType: string;
  setPhotoType: React.Dispatch<React.SetStateAction<string>>;
}

export const Context = createContext<ContextProps>({} as ContextProps);

const App: React.FC = () => {
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);
  const [textValue, setTextValue] = useState<string>('Text');
  const [fontSize, setFontSize] = useState<number>(32);
  const [angle, setAngle] = useState<number>(0);
  const [scaleX, setScaleX] = useState<number>(1);
  const [scaleY, setScaleY] = useState<number>(1);
  const [rightbarContent, setRightbarContent] = useState<React.ReactNode>(<></>);
  const [resolution, setResolution] = useState<string>('1x1');
  const [photoType, setPhotoType] = useState<string>('Rectangular');

  const contextValue: ContextProps = {
    width,
    setWidth,
    height,
    setHeight,
    rightbarContent,
    setRightbarContent,
    textValue,
    setTextValue,
    fontSize,
    setFontSize,
    angle,
    setAngle,
    scaleX,
    setScaleX,
    scaleY,
    setScaleY,
    resolution,
    setResolution,
    photoType,
    setPhotoType,
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
