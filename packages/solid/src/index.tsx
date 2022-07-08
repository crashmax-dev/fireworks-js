import { Fireworks as FireworksJS } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'
import { onCleanup, onMount } from 'solid-js'
import type { JSX, ParentComponent } from 'solid-js'

type FireworksProps = {
  options?: FireworksOptions
  style?: JSX.CSSProperties
}

const Fireworks: ParentComponent<FireworksProps> = ({
  options,
  style,
  children
}) => {
  let container: HTMLDivElement | undefined
  let fireworks: FireworksJS | undefined

  onMount(() => {
    fireworks = new FireworksJS(container!, options)
    fireworks.start()

    onCleanup(() => {
      fireworks!.stop()
    })
  })

  return (
    <div
      ref={container!}
      style={style}
    >
      {children}
    </div>
  )
}

export { Fireworks }
export type { FireworksOptions }
export default Fireworks
