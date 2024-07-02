import { Box, useMatcapTexture } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import { Interactive, RayGrab, useInteraction } from '@react-three/xr';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import * as THREE from 'three';
import { useState, useEffect } from 'react';
import React from 'react';

function Cube({ position, args = [0.06, 0.06, 0.06] }) {
  const [boxRef] = useBox(() => ({
    position,
    mass: 1,
    args,
    type: 'Dynamic'
  }));

  const [tex] = useMatcapTexture('C7C0AC_2E181B_543B30_6B6270');
  const [hover, setHover] = React.useState(false)

  return (
    <RayGrab
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
      // onSelect={position = [1, 1, 1]}
    >
      <Box ref={boxRef} args={args} castShadow>
        <meshMatcapMaterial attach="material" matcap={tex} color={hover ? '#35ffff' : '#ffffff'}/>
      </Box>
    </RayGrab>
  );
}

export default Cube;