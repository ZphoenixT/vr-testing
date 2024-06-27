import { Box, useMatcapTexture } from '@react-three/drei'
import { useBox, Physics, useSphere } from '@react-three/cannon'
import { Interactive } from '@react-three/xr';
import { useState } from 'react';

function Cube({ position, args = [0.06, 0.06, 0.06] }) {
    const [boxRef] = useBox(() => ({
      position,
      mass: 1,
      args,
      type: 'Dynamic'
    }))

    const [tex] = useMatcapTexture('C7C0AC_2E181B_543B30_6B6270')
    const [hovered, setHovered] = useState(false);

    return (
      <Interactive
          onHover={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
        <Box ref={boxRef} args={args} castShadow>
          <meshMatcapMaterial attach="material" matcap={tex} color={hovered ? 'hotpink' : 'white'}/>
        </Box>
    </Interactive>
    // fix?
    )
}


export default Cube