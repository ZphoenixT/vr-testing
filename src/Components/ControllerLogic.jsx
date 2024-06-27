import React, { useState, useEffect, Fragment, useRef } from 'react'
import { Hands, VRButton, XR, Controllers, XRController} from '@react-three/xr'
import { Physics, useBox } from '@react-three/cannon'

function ControllerLogic() {

    const leftControllerRef = useRef();
    const rightControllerRef = useRef();
  
    // Create a box collision shape for each controller
    const [leftControllerCollisionRef, leftControllerApi] = useBox(() => ({
      args: [0.1, 0.1, 0.1], // Adjust size as needed
      type: 'Dynamic', // Can be 'Dynamic' if you want it to move objects
      position: [0, 0, 0], // Initial position relative to the controller
      collisionFilterGroup: 2, // Group number for collisions
      collisionFilterMask: 1, // Mask for collisions
    }));
  
    const [rightControllerCollisionRef, rightControllerApi] = useBox(() => ({
      args: [0.1, 0.1, 0.1], // Adjust size as needed
      type: 'Dynamic', // Can be 'Dynamic' if you want it to move objects
      position: [0, 0, 0], // Initial position relative to the controller
      collisionFilterGroup: 3, // Different group number for collisions
      collisionFilterMask: 1, // Mask for collisions
    }));
  
    useEffect(() => {
      // Link collision shapes to the XR controllers
      if (leftControllerRef.current && leftControllerCollisionRef.current) {
        leftControllerRef.current.add(leftControllerCollisionRef.current);
      }
      if (rightControllerRef.current && rightControllerCollisionRef.current) {
        rightControllerRef.current.add(rightControllerCollisionRef.current);
      }
  
      return () => {
        // Clean up if needed
        // For example, remove collision shapes from controllers
        if (leftControllerRef.current && leftControllerCollisionRef.current) {
          leftControllerRef.current.remove(leftControllerCollisionRef.current);
        }
        if (rightControllerRef.current && rightControllerCollisionRef.current) {
          rightControllerRef.current.remove(rightControllerCollisionRef.current);
        }
      };
    }, [leftControllerCollisionRef, rightControllerCollisionRef]);

  return (
    <group>
        <Controllers />
    </group>
  )
}

export default ControllerLogic