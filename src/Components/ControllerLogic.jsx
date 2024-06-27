import React, { useRef } from 'react';
import { Controllers, useXR, TeleportationPlane } from '@react-three/xr';
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
    position: [0, 0, 0], // Initial position, will be updated in useFrame
    collisionFilterGroup: 2,
    collisionFilterMask: 1,
  }));

  const [rightControllerCollisionRef, rightControllerApi] = useBox(() => ({
    args: [0.2, 0.2, 0.2],
    type: 'Dynamic',
    position: [0.5, 0, 0], // Initial position, will be updated in useFrame
    collisionFilterGroup: 3,
    collisionFilterMask: 1,
  }));

  // Update collision box positions and rotations based on controllers
  useFrame(() => {
    if (leftControllerRef.current) {
      const { position, rotation } = leftControllerRef.current.controller;
      console.log('Left Controller Found:', position.clone().toArray());
      leftControllerApi.position.copy(position);
      leftControllerApi.rotation.copy(rotation);
      console.log("Left Test");
    }

    if (rightControllerRef.current) {
      const { position, rotation } = rightControllerRef.current.controller;
      console.log('Right Controller Found:', position.clone().toArray());
      rightControllerApi.position.copy(position);
      rightControllerApi.rotation.copy(rotation);
      console.log("Right Test");
    }

    
  });

  return (
    <group>
      <Controllers
        {...(props) => {
          const { leftController, rightController } = props;
          if (leftController) leftControllerRef.current = leftController.controller;
          if (rightController) rightControllerRef.current = rightController.controller;
          return null;
        }}
      />
      <TeleportationPlane leftHand/>
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
