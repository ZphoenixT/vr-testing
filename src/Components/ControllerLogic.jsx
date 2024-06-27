import React, { useRef } from 'react';
import { Controllers, TeleportationPlane } from '@react-three/xr';

function ControllerLogic() {
  return (
    <group>
      <Controllers />
      <TeleportationPlane leftHand />
    </group>
  );
}

export default ControllerLogic;
