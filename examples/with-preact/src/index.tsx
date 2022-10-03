import { render } from 'preact'
import React from 'preact/compat'
import { App } from './App'

const app = document.getElementById('app')!
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  app
)
