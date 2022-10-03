import { Fireworks as FireworksJs } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'
import type { ComponentChildren } from 'preact'
import React from 'preact/compat'
import { useEffect, useImperativeHandle, useRef } from 'preact/hooks'

interface FireworksProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ComponentChildren
  options?: FireworksOptions
}

interface FireworksHandlers
  extends Pick<
    FireworksJs,
    'isRunning' | 'start' | 'pause' | 'clear' | 'updateOptions' | 'updateSize'
  > {
  stop(): void
}

const Fireworks = React.forwardRef<FireworksHandlers, FireworksProps>(
  ({ children, options, ...rest }, ref) => {
    const container = useRef<HTMLDivElement>(null)
    const fireworks = useRef<FireworksJs | null>(null)

    useImperativeHandle(ref, () => ({
      get isRunning() {
        return fireworks.current!.isRunning
      },
      start() {
        fireworks.current!.start()
      },
      stop() {
        fireworks.current!.stop()
      },
      pause() {
        fireworks.current!.pause()
      },
      clear() {
        fireworks.current!.clear()
      },
      updateOptions(options) {
        fireworks.current!.updateOptions(options)
      },
      updateSize(size) {
        fireworks.current!.updateSize(size)
      }
    }))

    useEffect(() => {
      fireworks.current = new FireworksJs(container.current!, options)
      fireworks.current.start()

      return () => {
        fireworks.current!.stop(true)
      }
    }, [])

    return (
      <div
        ref={container}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

export { Fireworks }
export default Fireworks
export type { FireworksProps, FireworksHandlers, FireworksOptions }
