import React, { useRef } from 'react';
import { Controllers, TeleportationPlane } from '@react-three/xr';
import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

function ControllerLogic() {
  const leftControllerRef = useRef();
  const rightControllerRef = useRef();

  // Setup collision boxes for controllers
  const [leftControllerCollisionRef, leftControllerApi] = useBox(() => ({
    args: [0.2, 0.2, 0.2],
    type: 'Dynamic',
    position: [0, 0, 0],
    collisionFilterGroup: 2,
    collisionFilterMask: 1,
  }));

  const [rightControllerCollisionRef, rightControllerApi] = useBox(() => ({
    args: [0.2, 0.2, 0.2],
    type: 'Dynamic',
    position: [0.5, 0, 0],
    collisionFilterGroup: 3,
    collisionFilterMask: 1,
  }));

  // Update collision box positions and rotations based on controllers
  useFrame(() => {
    if (leftControllerRef.current && leftControllerRef.current.controller) {
      const { position, rotation } = leftControllerRef.current.controller;
      console.log('Left Controller Position:', position.toArray());
      console.log('Left Controller Rotation:', rotation.toArray());
      leftControllerApi.position.copy(position);
      leftControllerApi.rotation.copy(rotation);
    } else {
      console.log('Left Controller not connected or controller property is undefined.');
    }

    if (rightControllerRef.current && rightControllerRef.current.controller) {
      const { position, rotation } = rightControllerRef.current.controller;
      console.log('Right Controller Position:', position.toArray());
      console.log('Right Controller Rotation:', rotation.toArray());
      rightControllerApi.position.copy(position);
      rightControllerApi.rotation.copy(rotation);
    } else {
      console.log('Right Controller not connected or controller property is undefined.');
    }
  });

  return (
    <group>
      <Controllers
        onConnected={(event) => {
          if (event.controller.handedness === 'left') {
            console.log('Left Controller Connected:', event);
            leftControllerRef.current = event;
          } else if (event.controller.handedness === 'right') {
            console.log('Right Controller Connected:', event);
            rightControllerRef.current = event;
          }
        }}
        onDisconnected={(event) => {
          if (event.controller.handedness === 'left') {
            console.log('Left Controller Disconnected:', event);
            leftControllerRef.current = null;
          } else if (event.controller.handedness === 'right') {
            console.log('Right Controller Disconnected:', event);
            rightControllerRef.current = null;
          }
        }}
      />
      <TeleportationPlane leftHand />
      {/* Display the collision boxes */}
      <Box ref={leftControllerCollisionRef} args={[0.2, 0.2, 0.2]}>
        <meshBasicMaterial color="red" wireframe />
      </Box>
      <Box ref={rightControllerCollisionRef} args={[0.2, 0.2, 0.2]}>
        <meshBasicMaterial color="blue" wireframe />
      </Box>
    </group>
  );
}

export default ControllerLogic;
