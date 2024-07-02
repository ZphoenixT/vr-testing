import React, { useEffect, useRef } from 'react';
import { Controllers, TeleportationPlane, useXR, Interactive, XRController } from '@react-three/xr';
import { Vector3 } from 'three';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

function ControllerLogic() {

  return (
    <group>
      <Controllers
        rayMaterial={{color: '#00d5ff'}}
        hand = 'right'
      />
      {/* <TeleportationPlane leftHand /> */}
    </group>
  );
}

export default ControllerLogic;
