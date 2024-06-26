import { Sphere, useMatcapTexture } from '@react-three/drei'
import { useBox, Physics, useSphere } from '@react-three/cannon'

function Ball({ position, args = [0.06, 32, 32] }) {
    const [ballRef] = useSphere(() => ({ position, mass: 1, args }))
    const [tex] = useMatcapTexture('C7C0AC_2E181B_543B30_6B6270')
  
    return (
      <Sphere ref={ballRef} args={args} castShadow>
        <meshMatcapMaterial attach="material" matcap={tex} />
      </Sphere>
    )
}


export default Ball