// components/Fireworks.tsx
import { Fireworks } from 'fireworks-js/dist/react'

export default () => <Fireworks />

// pages/index.tsx
import dynamic from 'next/dynamic'

const FireworksWithNoSSR = dynamic(
  () => import('../components/Fireworks'),
  { ssr: false }
)