import { useRef } from 'react'
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'

export function App() {
  const ref = useRef<FireworksHandlers>(null)

  const toggle = () => {
    ref.current!.isRunning ? ref.current!.stop() : ref.current!.start()
  }

  return (
    <>
      <div style={{ position: 'absolute', zIndex: 1 }}>
        <button onClick={() => toggle()}>Toggle</button>
        <button onClick={() => ref.current!.clear()}>Clear</button>
      </div>
      <Fireworks
        ref={ref}
        options={{ opacity: 0.5 }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          background: '#000'
        }}
      />
    </>
  )
}
