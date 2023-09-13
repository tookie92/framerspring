'use client'
import React, { Suspense, useEffect, useState } from 'react'
import {Canvas} from "@react-three/fiber"
import { Switch } from './Switch'
import {motion} from "framer-motion-3d"
import { animate, useMotionValue } from 'framer-motion'
type CanvasProps = {
    isCanvasActive?: boolean 
    onClick: ()=>void
}
function MonCanvas({ isCanvasActive, onClick }: CanvasProps) {
    // console.log(isCanvasActive)
    const color = useMotionValue<string>("#7fffd4")
    
    useEffect(() => {
        animate(color,isCanvasActive?"#7fffd4":"#c72f46")
    })
  return (
      <Canvas orthographic shadows dpr={[1, 2]} camera={{ zoom: 60, position: [-10, 10, 10], fov: 35 }}>
         <ambientLight intensity={0.1} />
            <directionalLight position={[-20, 20, 20]} intensity={1} />
            <motion.directionalLight position={[-20, -20, -20]} intensity={0.5} color={color}  />
            <motion.pointLight position={[0, 0, 5]} distance={5} intensity={5} color={color}  />
          <motion.spotLight color={color} position={[10, 20, 20]} angle={0.1} intensity={2} shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-bias={-0.00001} castShadow />
          <Suspense fallback={null}>
                    <Switch valueActive={isCanvasActive} onClick={onClick} />
          </Suspense>
                
            <mesh receiveShadow renderOrder={1000} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10, 10]} />
                <shadowMaterial transparent opacity={0.05} />
            </mesh>
    </Canvas>
  )
}

export default MonCanvas