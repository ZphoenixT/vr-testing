import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { VRButton, XR } from '@react-three/xr';
import { Physics } from '@react-three/cannon';
import Scene from './Components/Scene';
import ControllerLogic from './Components/ControllerLogic';
import Grab from './Components/Grab';

function App() {
  const scene = useRef(); // Define scene as a useRef

  return (
    <>
      <VRButton />
      <Canvas shadowMap>
        <XR>
          <Physics gravity={[0, -2, 0]} iterations={20}>
            <Scene scene={scene} />
            <ControllerLogic />
            <Grab scene={scene} />
          </Physics>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
