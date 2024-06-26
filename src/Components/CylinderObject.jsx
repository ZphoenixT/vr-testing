import { Cylinder, useMatcapTexture } from '@react-three/drei'
import { useCylinder } from '@react-three/cannon'

function CylinderObject({ position, args = [0.1, 0.1, 0.1, 64] }) {
  const [cylinderRef] = useCylinder(() => ({ position, mass: 1, args }))
  const [tex] = useMatcapTexture('C7C0AC_2E181B_543B30_6B6270')
  
  return (
    <Cylinder ref={cylinderRef} args={args} castShadow>
      <meshMatcapMaterial attach="material" matcap={tex} />
    </Cylinder>
  )
}

export default CylinderObject
