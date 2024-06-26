import Scene from "./Components/Scene";
import { createRoot } from 'react-dom/client'
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { VRCanvas, Hands, VRButton, XR, useController} from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import ControllerModel from "./Components/ControllerModel";

function App() {

  return (
    <>
    <VRButton />
    <Canvas shadowMap>
      <XR>
        <Physics
          gravity={[0, -2, 0]}
          iterations={20}
          defaultContactMaterial={{
          friction: 0.09
          }}>
          <Scene />
        </Physics>
        <ControllerModel hand="left" />
        <ControllerModel hand="right" />
      </XR>
    </Canvas>
  </>
  );
}

export default App;
