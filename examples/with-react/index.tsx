import React from 'react'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Fireworks from '@fireworks-js/react'

function App() {
  const [enabled, setEnabled] = useState(true)

  return (
    <>
      <button
        onClick={() => setEnabled(!enabled)}
        style={{ position: 'absolute', zIndex: 1 }}
      >
        {enabled ? 'Enabled' : 'Disabled'}
      </button>
      {enabled && (
        <Fireworks
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
      )}
    </>
  )
}

const app = document.querySelector('#app')!
const root = createRoot(app)
root.render(<App />)
