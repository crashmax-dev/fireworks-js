import { Fireworks as FireworksJS } from 'fireworks-js'
import { mergeProps, onCleanup, onMount } from 'solid-js'
import type { FireworksHandlers, FireworksOptions } from 'fireworks-js'
import type { JSX, ParentComponent } from 'solid-js'

interface FireworksProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'ref'> {
  options?: FireworksOptions
  autostart?: boolean
  ref?: (handlers: FireworksHandlers) => void
}

const Fireworks: ParentComponent<FireworksProps> = (props) => {
  const { autostart, options, children, ref, ...rest } = mergeProps(
    { autostart: true },
    props
  )
  let container: HTMLDivElement | undefined
  let fireworks: FireworksJS | undefined

  onMount(() => {
    fireworks = new FireworksJS(container!, options)
    if (autostart) {
      fireworks.start()
    }

    if (ref) {
      ref(fireworks)
    }

    onCleanup(() => {
      fireworks!.stop()
    })
  })

  return (
    <div
      ref={container}
      {...rest}
    >
      {children}
    </div>
  )
}

export { Fireworks }
export default Fireworks
export type { FireworksOptions, FireworksHandlers }
