import Scene from "./Components/Scene";
import { createRoot } from 'react-dom/client'
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { Hands, VRButton, XR, Controllers, XRController } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { Physics, useBox } from '@react-three/cannon'
import ControllerLogic from "./Components/ControllerLogic";


function App() {
 
  return (
    <>
      <VRButton />
      <Canvas shadowMap>
        <XR>
          <Physics gravity={[0, -2, 0]} iterations={20}>
            <Scene />
            <ControllerLogic/>
          </Physics>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
