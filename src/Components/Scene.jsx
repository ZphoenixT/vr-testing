import { Box, OrbitControls, Plane, Sphere, Sky, useMatcapTexture } from '@react-three/drei'
import { usePlane } from '@react-three/cannon'
import Cube from './Cube'
import Ball from './Ball'
import CylinderObject from './CylinderObject'
import CapsuleObject from './CapsuleObject'
 {/*  */}

function Scene() {

    const [floorRef] = usePlane(() => ({
        args: [10, 10],
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0.5, 0],
        type: 'Static'
    }))

  return (
    <>
     {/* sky box */}
      <Sky />

       {/* Plane makes a flat area that acts like a barrier
        that can only be seen from one side */}
      <Plane ref={floorRef} args={[10, 10]} receiveShadow>
        <meshStandardMaterial attach="material" color="#bbbbbb" />
      </Plane>

       {/* this is an array for calling cubes, the firs number is for how many */}
      {[...Array(10)].map((_, i) => (
        <Cube key={i} position={[0, 1.1 + 0.1 * i, -0.5]} />
      ))}
      {/* this is an array for calling balls */}
      {[...Array(10)].map((_, i) => (
        <Ball key={i} position={[1.5, 1.1 + 0.1 * i, -0.5]} />
      ))}

        {[...Array(5)].map((_, i) => (
        <CylinderObject key={i} position={[2.5, 1.1 + 0.1 * i, -0.5]} />
      ))}

        {[...Array(1)].map((_, i) => (
        <CapsuleObject key={i} position={[2.5, 1.1 + 0.1 * i, -0.5]} />
      ))}

       {/* OrbitControls allow you to use your mouse to click and
       drag to move your camera around the center of the screen */}
      <OrbitControls />

       {/* the ambientLight is the light level of the area and effects plans meshes */}
      <ambientLight intensity={0.6} />
       {/* spotlight makes a cone of light the effects only the set radius */}
      <spotLight position={[1, 8, 1]} angle={0.2} penumbra={1} intensity={8} castShadow />
    </>
  )
}

export default Scene