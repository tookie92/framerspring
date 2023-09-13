'use client'

import { useEffect, useState } from "react"
import MonCanvas from "./components/MonCanvas"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import './globals.css'


export default function Home() {
  const [isCanvasActive, setCanvasActive] = useState<boolean>(false);
  const backgroundColor = useMotionValue<any>("")
  const count = useMotionValue(0)
  const rounded= useTransform(count, Math.round)
  const color = useMotionValue<any>("")
 
  useEffect(() => {
    animate(rounded,
      isCanvasActive ? 0 : 5,
      {duration:1}
    )
    animate(backgroundColor,
      isCanvasActive ? "#c9ffed" : "#ff2558",
      {duration:1, type:"spring"}
    )
    animate(color,
      isCanvasActive ? "#7fffd4" : "#c70f46",
      {duration:1, type:"spring"}
    )
  },[backgroundColor,color,isCanvasActive])
  return (
    <div className="relative h-screen w-screen overflow-y-hidden ">
        <motion.div className="absolute h-full w-full " style={{background: backgroundColor,color}}>
      <h1 className="top-[20%] left-[30%]" >{`<h1>`}</h1>
        <h1 className="top-[80%] left-[60%]"  >{`</h1>`}</h1>
        <div className="absolute z-40 bottom-3">
          <span >{`inspirée faite avec framer-motion-3d par une animation-spring`}</span> <br />
         <a className=" cursor-pointer hover:text-white" target="_blank" href="https://codesandbox.io/s/6hi1y">voir exemple</a>
          
        </div>
      <motion.h1  className="top-[50%] left-1/2" >{ rounded}</motion.h1>
      <MonCanvas isCanvasActive={isCanvasActive } onClick={()=>setCanvasActive(!isCanvasActive)} />
    </motion.div>
    </div>
    
  )
}
