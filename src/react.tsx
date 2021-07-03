import React, { CSSProperties, useEffect, useRef } from 'react'
import { FireworksOptions, Fireworks as Fw } from './fireworks'

interface FireworksProps {
  options?: FireworksOptions
  style?: CSSProperties
}

const Fireworks: React.FC<FireworksProps> = ({
  options,
  style,
  children
}) => {
  const canvas = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const fireworks = new Fw(canvas.current, options)

    fireworks.updateSize()
    fireworks.start()

    return () => {
      fireworks.stop()
    }
  }, [])

  return (
    <div style={style} ref={canvas}>{children}</div>
  )
}

export { Fireworks, FireworksOptions }