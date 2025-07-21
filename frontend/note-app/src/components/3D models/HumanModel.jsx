import React from 'react';
import { useGLTF } from '@react-three/drei';

export function HumanModel(props) {
  const { scene } = useGLTF('/human/human.glb');
  return <primitive object={scene} {...props} />;
}