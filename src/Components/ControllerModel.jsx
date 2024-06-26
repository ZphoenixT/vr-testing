import React, { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'

function ControllerModel({ hand }) {
  const controllerRef = useRef()
  const gripRef = useRef()

  const { gl } = useThree()

  useEffect(() => {
    if (!controllerRef.current || !gripRef.current) return

    const controllerModelFactory = new XRControllerModelFactory()
    const controllerModel = controllerModelFactory.createControllerModel(gripRef.current)
    gripRef.current.add(controllerModel)

    const handleControllerConnected = (event) => {
      const controller = event.target
      console.log(`Controller connected: ${hand}`, controller)
      if (controllerRef.current) {
        controller.add(controllerRef.current)
      } else {
        console.error('controllerRef.current is null')
      }
    }

    const handleControllerDisconnected = (event) => {
      const controller = event.target
      console.log(`Controller disconnected: ${hand}`, controller)
      if (controllerRef.current) {
        controller.remove(controllerRef.current)
      } else {
        console.error('controllerRef.current is null')
      }
    }

    const controller = gl.xr.getController(hand === 'right' ? 1 : 0)
    if (controller) {
      controller.addEventListener('connected', handleControllerConnected)
      controller.addEventListener('disconnected', handleControllerDisconnected)
    } else {
      console.error(`No ${hand} controller found`)
    }

    return () => {
      if (controller) {
        controller.removeEventListener('connected', handleControllerConnected)
        controller.removeEventListener('disconnected', handleControllerDisconnected)
      }
    }
  }, [gl.xr, hand])

  return (
    <>
      <group ref={controllerRef} />
      <group ref={gripRef} />
    </>
  )
}

export default ControllerModel
