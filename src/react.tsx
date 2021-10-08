/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component, CSSProperties } from 'react'
import { FireworksOptions, Fireworks as Fw } from './fireworks'

export interface FireworksProps {
  options?: FireworksOptions
  style?: CSSProperties
}

export class Fireworks extends Component<FireworksProps> {
  _fw: Fw
  _ref: HTMLElement | null = null

  componentDidMount() {
    if (this._ref) {
      this._fw = new Fw(this._ref, this.props.options)
      this._fw.start()
    }
  }

  componentWillUnmount() {
    this._fw.stop()
  }

  render() {
    return React.createElement('div', {
      ref: (ref: HTMLElement) => (this._ref = ref),
      children: this.props.children,
      style: this.props.style
    })
  }
}