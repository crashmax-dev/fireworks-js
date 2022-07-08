import { Fireworks as FireworksJs } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'
import React from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'

type FireworksProps = {
  options?: FireworksOptions
  style?: React.CSSProperties
}

const Fireworks: React.FC<FireworksProps> = ({ options, style, children }) => {
  const fireworks = useRef<FireworksJs | null>(null)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fireworks.current = new FireworksJs(container.current!, options)
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
export type { FireworksOptions } from 'fireworks-js'
export default Fireworks
