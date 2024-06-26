import Scene from "./Components/Scene";
import { createRoot } from 'react-dom/client'
import React, { useState, useEffect, Fragment } from 'react'
import { VRCanvas, Hands, VRButton, XR } from '@react-three/xr'
import { useThree, useFrame, Canvas } from '@react-three/fiber'
import { Box, OrbitControls, Plane, Sphere, Sky, useMatcapTexture } from '@react-three/drei'
import { usePlane, useBox, Physics, useSphere } from '@react-three/cannon'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
          
          {/* Load left hand model */}
          <GLTFLoader url={process.env.PUBLIC_URL + `my-app4/public/models/left.glb`}>
              {(gltfLeft) => <primitive object={gltfLeft.scene} />}
            </GLTFLoader>
            
            {/* Load right hand model */}
            <GLTFLoader url={process.env.PUBLIC_URL + `my-app4/public/models/right.glb`}>
              {(gltfRight) => <primitive object={gltfRight.scene} />}
            </GLTFLoader>

          <Hands />
        </Physics>
      </XR>
    </Canvas>
  </>
  );
}

export default App;
