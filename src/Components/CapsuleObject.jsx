import { Capsule, useMatcapTexture } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'

function CapsuleObject({ position, args = [0.5, 1] }) {
  const [capsuleRef] = useSphere(() => ({ position, mass: 1, args }))
  const [tex] = useMatcapTexture('C7C0AC_2E181B_543B30_6B6270')
  
  return (
    <Capsule ref={capsuleRef} args={args} castShadow>
      <meshMatcapMaterial attach="material" matcap={tex} />
    </Capsule>
  )
}

export default CapsuleObject
