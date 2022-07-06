import { Fireworks as VanillaFireworks } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'
import React, { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

type FireworksProps = {
  children?: React.ReactNode
  options?: FireworksOptions
  style?: CSSProperties
}

const Fireworks = ({ children, options, style }: FireworksProps) => {
  const [fireworks, setFireworks] = useState<VanillaFireworks | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fireworks && ref.current) {
      const fireworksInstance = new VanillaFireworks(ref.current, options)
      fireworksInstance.start()
      setFireworks(fireworksInstance)
    }

    ; () => {
      if (fireworks) {
        fireworks.stop()
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      style={style}
    >
      {children}
    </div>
  )
}

export { Fireworks }
export type { FireworksOptions }
export default Fireworks
