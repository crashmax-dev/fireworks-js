import React, { useState, CSSProperties } from 'react'
import { Fireworks, FireworksOptions } from '../src/react'

export const App: React.FC = () => {
  const [isEnable, setEnable] = useState(true)

  const options: FireworksOptions = {
    speed: 3,
    mouse: {
      max: 3,
      move: false,
      click: true
    }
  }

  const style: CSSProperties = {
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: '#000'
  }

  return (
    <div>
      <button
        onClick={() => setEnable(!isEnable)}
        style={{ position: 'absolute', zIndex: 9999 }}
      >
        {isEnable ? 'Stop' : 'Start'}
      </button>
      {isEnable && <Fireworks options={options} style={style} />}
    </div>
  )
}