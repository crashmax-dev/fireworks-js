import { Fireworks, FireworksHandlers } from '@fireworks-js/solid'
import { createSignal, Show } from 'solid-js'

export function App() {
  const [enabled, setEnabled] = createSignal(true)
  let fireworks: FireworksHandlers

  // https://github.com/solidjs/solid/issues/116#issuecomment-583247897
  setTimeout(() => console.log(fireworks))

  const toggleFireworks = () => {
    if (fireworks.isRunning) {
      fireworks.waitStop()
    } else {
      fireworks.start()
    }
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '4px',
          position: 'absolute',
          'z-index': 1
        }}
      >
        <button onClick={() => setEnabled(!enabled())}>
          {enabled() ? 'Enabled' : 'Disabled'}
        </button>
        <button onClick={() => toggleFireworks()}>Toggle</button>
      </div>
      <Show when={enabled()}>
        <Fireworks
          ref={(ref) => (fireworks = ref)}
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
      </Show>
    </>
  )
}
