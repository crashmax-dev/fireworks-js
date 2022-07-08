import { createRoot } from 'react-dom/client'
import { App } from './App'

const app = document.querySelector('#app')!
createRoot(app).render(<App />)
