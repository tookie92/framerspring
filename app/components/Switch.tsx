'use client'
import * as THREE from "three"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGLTF, useTexture, Shadow, meshBounds } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import{motion} from "framer-motion-3d"
import { animate, useMotionValue } from "framer-motion";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Sphere: THREE.Mesh;
  };
  materials: {
    track: THREE.MeshStandardMaterial;
    sphere: THREE.MeshStandardMaterial;
  };
};
type SwitchProps = {
  props?: JSX.IntrinsicElements["group"],
  valueActive: boolean | undefined,
  onClick: ()=>void
}

export function Switch({props, valueActive, onClick}: SwitchProps) {
  const { nodes, materials } = useGLTF("/switch.glb") as GLTFResult;
  const texture = useTexture("/cross.jpg")
  const color = useMotionValue<string>("")

  useEffect(() => {
    animate(color,valueActive?"#888":"#2a2a2a")
  },[color,valueActive])
 
  return (
    <group scale={[1.25, 1.25, 1.25]} {...props} dispose={null}>
      <motion.mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.track}
        material-color={color}
        material-roughness={0.5}
        material-metalness={0.8}
      />
      <motion.group
        onClick={onClick}
        position-y={0.85}
        animate={{
          z: valueActive ? 1.2 : -1.2,
        }}
        transition={
          {
            type: "spring",
            bounce:0.5,
          
          }
          
        }
      >
        <motion.mesh receiveShadow castShadow raycast={meshBounds}
          animate={{
          rotateX: valueActive ? 0 : Math.PI * 1.3

          }}
          transition={
            {
              type: "spring",
              bounce:0.5
            }
            
          }
        >
          <sphereGeometry args={[0.8, 64, 64]} />
          <motion.meshStandardMaterial roughness={0.5} map={texture} />
        </motion.mesh>
        <motion.pointLight intensity={100} distance={1.4} color={color}  />
        <Shadow renderOrder={-1000} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5} />
      </motion.group>
      
    </group>
  );
}

useGLTF.preload("/switch.glb");
