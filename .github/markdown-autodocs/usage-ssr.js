// components/Fireworks.tsx
import { Fireworks } from 'fireworks-js/dist/react'
// pages/index.tsx
import dynamic from 'next/dynamic'

export default () => <Fireworks />

const FireworksWithNoSSR = dynamic(() => import('../components/Fireworks'), {
  ssr: false
})
