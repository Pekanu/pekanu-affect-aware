import { Suspense, useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import Woman from './Woman'
import { OrbitControls } from '@react-three/drei'

import { BotContext } from '../../store/Bot'

const Frame = () => {
  const { state } = useContext(BotContext)

  return ( 
    <div className='h-full py-4'>
      <h1 className='text-3xl font-bold'>It's me, Pekanu</h1>
      <span>{state}</span>
      <Canvas className='max-h-fit '>
        <OrbitControls />
        <directionalLight intensity={0.5} />
        <directionalLight intensity={0.6} position={[0, 0, 1]} />
        <ambientLight intensity={0.2} position={[50, 0, 0]} />
        <Suspense fallback={null}>
          <group position={[0, -2.5, 0]}>
            <Woman state={state} scale={2.8} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Frame
