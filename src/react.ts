import React, { Component, CSSProperties, useState } from 'react'
import { FireworksOptions, Fireworks as Fw } from './fireworks'

type useFireworksProps = {
  initialStart?: boolean
  initialOptions?: FireworksOptions
}

export const useFireworks = ({ initialStart = true, initialOptions = {} }: useFireworksProps) => {
  const [enabled, _setEnabled] = useState<boolean>(initialStart)
  const [options, setOptions] = useState<FireworksOptions>(initialOptions)

  const setEnabled = (state?: boolean) => {
    _setEnabled((preState) => state ?? !preState)
  }

  return {
    enabled,
    options,
    setOptions,
    setEnabled
  }
}

export type FireworksProps = {
  className?: string
  style?: CSSProperties
  enabled?: boolean
  options?: FireworksOptions
}

export class Fireworks extends Component<FireworksProps> {
  private _fw: Fw | null = null
  private _ref: HTMLElement | null = null

  static defaultProps = {
    enabled: true
  }

  componentDidMount() {
    if (this._ref) {
      this._fw = new Fw(this._ref, this.props.options)
      this.toggleStart()
    }
  }

  componentDidUpdate() {
    this.toggleStart()

    if (this.props.options) {
      this._fw?.setOptions({ ...this.props.options })
    }
  }

  componentWillUnmount() {
    this._fw?.unmount()
    this._fw?.stop()
  }

  toggleStart() {
    if (this.props.enabled) {
      this._fw?.start()
    } else {
      this._fw?.stop()
    }
  }

  render() {
    return React.createElement('div', {
      ref: (ref: HTMLElement) => (this._ref = ref),
      className: this.props.className,
      children: this.props.children,
      style: this.props.style
    })
  }
}