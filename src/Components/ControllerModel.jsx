import React from 'react'
import { group } from 'three'
import { useThree } from '@react-three/fiber'
import useControllerSetup from './useControllerSetup'

function ControllerModel({ hand }) {
  const { controllerRef, gripRef } = useControllerSetup(hand)

  return (
    <>
      <group ref={controllerRef} />
      <group ref={gripRef} />
    </>
  )
}

export default ControllerModel
