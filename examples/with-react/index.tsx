import React from 'react'
import { CSSProperties, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Fireworks from '@fireworks-js/react'

const app = document.querySelector('#app')!
const root = createRoot(app)
const style: CSSProperties = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  position: 'fixed',
  background: '#000'
}

function App() {
  const [enabled, setEnabled] = useState(true)

  return (
    <>
      <button
        onClick={() => setEnabled(!enabled)}
        style={{ position: 'absolute', zIndex: 1 }}
      >
        {enabled ? 'Disable' : 'Enable'}
      </button>
      {enabled && <Fireworks style={style} />}
    </>
  )
}

root.render(<App />)
