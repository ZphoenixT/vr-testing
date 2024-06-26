import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'

function useControllerSetup(hand) {
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
        }
      }
      
      const handleControllerDisconnected = (event) => {
        const controller = event.target
        console.log(`Controller disconnected: ${hand}`, controller)
        if (controllerRef.current) {
          controller.remove(controllerRef.current)
        }
      }
      

      const setupController = (index) => {
        const controller = gl.xr.getController(index)
        const grip = gl.xr.getControllerGrip(index)
      
        if (controller && grip) {
            console.log(`Found ${hand} controller and grip`)
          grip.add(gripRef.current)
          controller.add(controllerRef.current)
          controller.addEventListener('connected', handleControllerConnected)
          controller.addEventListener('disconnected', handleControllerDisconnected)
          return { controller, grip }
        } else {
          console.error(`No ${hand} controller found`)
          return null
        }
      }

    const controllerIndex = hand === 'right' ? 1 : 0
    const controllerSetup = setupController(controllerIndex)

    return () => {
      if (controllerSetup) {
        const { controller, grip } = controllerSetup
        controller.removeEventListener('connected', handleControllerConnected)
        controller.removeEventListener('disconnected', handleControllerDisconnected)
        grip.remove(gripRef.current)
        controller.remove(controllerRef.current)
      }
    }
  }, [gl.xr, hand])

  return { controllerRef, gripRef }
}

export default useControllerSetup
