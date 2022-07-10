import { Component, OnDestroy, Input, ViewChild, AfterViewInit, ElementRef, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformServer } from '@angular/common'
import { Fireworks } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'

@Component({
  selector: 'ng-fireworks',
  template: `<div #container></div>`
})
export class FireworksComponent implements AfterViewInit, OnDestroy {
  private fireworks!: Fireworks
  private isServer: boolean

  @Input() options?: FireworksOptions
  @Input() class?: string
  @Input() style?: string
  @Input() enabled?: boolean = true
  @ViewChild('container') container!: ElementRef<HTMLDivElement>

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isServer = isPlatformServer(platformId)
  }

  ngAfterViewInit(): void {
    if (this.isServer) return

    this.fireworks = new Fireworks(
      this.container.nativeElement,
      { ...this.options, autoresize: false }
    )

    if (this.enabled) {
      this.fireworks.start()
    }
  }

  ngOnDestroy(): void {
    this.fireworks.stop()
  }
}
