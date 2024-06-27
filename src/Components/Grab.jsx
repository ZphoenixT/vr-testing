// Grab.jsx
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useXR, useController } from '@react-three/xr';
import { Raycaster, Vector3 } from 'three';

function Grab({ scene }) {
  const grabbingController = useController();
  const raycaster = useRef(new Raycaster());
  const { isHandTracking } = useXR();
  const [grabbedObject, setGrabbedObject] = useState(null);

  useFrame(() => {
    if (!grabbingController) return;

    const controllerObject = grabbingController.controller;
    const controllerPosition = new Vector3().setFromMatrixPosition(controllerObject.matrixWorld);
    const controllerDirection = new Vector3(0, 0, -1).applyQuaternion(controllerObject.quaternion);

    raycaster.current.set(controllerPosition, controllerDirection);

    const intersects = raycaster.current.intersectObjects(scene.current.children, true);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;

      if (grabbingController.controller.inputSource.gamepad.buttons[0].pressed) {
        setGrabbedObject(intersectedObject);
      }
    } else {
      setGrabbedObject(null);
    }
  });

  useFrame(() => {
    if (grabbedObject && grabbingController) {
      grabbedObject.position.copy(grabbingController.controller.position);
    }
  });

  return null;
}

export default Grab;
