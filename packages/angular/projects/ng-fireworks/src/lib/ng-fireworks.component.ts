import { Component, Input, ViewChild, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformServer } from '@angular/common'
import { Fireworks } from 'fireworks-js'
import type { OnDestroy, AfterViewInit, ElementRef } from '@angular/core'
import type { FireworksOptions } from 'fireworks-js'

export type FireworksProps = Omit<FireworksOptions, 'autoresize'>

@Component({
  selector: 'ng-fireworks',
  template: `<div #container></div>`
})
export class NgFireworksComponent implements AfterViewInit, OnDestroy {
  private fireworks!: Fireworks
  private isServer: boolean

  @Input() options?: FireworksProps
  @ViewChild('container') container!: ElementRef<HTMLDivElement>

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isServer = isPlatformServer(platformId)
  }

  public ngAfterViewInit(): void {
    if (this.isServer) return

    this.fireworks = new Fireworks(
      this.container.nativeElement,
      { ...this.options, autoresize: false }
    )
    this.fireworks.start()
  }

  public ngOnDestroy(): void {
    this.fireworks.stop()
  }
}

@Component({
  selector: 'Fireworks',
  template: `<div #container></div>`
})
export class FireworksComponent extends NgFireworksComponent {
  @Input() override options?: FireworksProps
  @ViewChild('container') override container!: ElementRef<HTMLDivElement>
}
