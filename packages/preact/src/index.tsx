import { Fireworks as FireworksJs } from 'fireworks-js'
import React from 'preact/compat'
import { useEffect, useImperativeHandle, useRef } from 'preact/hooks'
import type { FireworksHandlers, FireworksOptions } from 'fireworks-js'
import type { ComponentChildren } from 'preact'

interface FireworksProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ComponentChildren
  options?: FireworksOptions
  autostart?: boolean
}

const Fireworks = React.forwardRef<FireworksHandlers, FireworksProps>(
  ({ children, options, autostart = true, ...rest }, ref) => {
    const container = useRef<HTMLDivElement>(null)
    const fireworks = useRef<FireworksJs | null>(null)

    useImperativeHandle(ref, () => ({
      get isRunning() {
        return fireworks.current!.isRunning
      },
      get currentOptions() {
        return fireworks.current!.currentOptions
      },
      start() {
        fireworks.current!.start()
      },
      launch(count) {
        fireworks.current!.launch(count)
      },
      stop() {
        fireworks.current!.stop()
      },
      async waitStop() {
        await fireworks.current!.waitStop()
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
      },
      updateBoundaries(boundaries) {
        fireworks.current!.updateBoundaries(boundaries)
      }
    }))

    useEffect(() => {
      fireworks.current = new FireworksJs(container.current!, options)
      if (autostart) {
        fireworks.current.start()
      }

      return () => {
        fireworks.current!.stop()
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
