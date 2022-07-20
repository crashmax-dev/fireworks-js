import { Fireworks as FireworksJs } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'
import React, { useEffect, useRef } from 'react'

type FireworksProps = {
  children?: React.ReactNode
  options?: FireworksOptions
  style?: React.CSSProperties
}

const Fireworks = ({ children, options, style }: FireworksProps) => {
  const container = useRef<HTMLDivElement>(null)
  const fireworks = useRef<FireworksJs | null>(null)

  useEffect(() => {
    if (!fireworks.current) {
      fireworks.current = new FireworksJs(container.current!, options)
    }
    fireworks.current.start()

    return () => {
      fireworks.current!.stop()
    }
  }, [])

  return (
    <div
      ref={container}
      style={style}
    >
      {children}
    </div>
  )
}

export { Fireworks }
export default Fireworks
export type { FireworksOptions }
