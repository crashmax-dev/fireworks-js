import { Show, createSignal } from 'solid-js'
import { Fireworks } from '@fireworks-js/solid'

export function App() {
  const [enabled, setEnabled] = createSignal(true)

  return (
    <>
      <button
        onClick={() => setEnabled(!enabled())}
        style={{ position: 'absolute', 'z-index': 1 }}
      >
        {enabled() ? 'Enabled' : 'Disabled'}
      </button>
      <Show when={enabled()}>
        <Fireworks
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
