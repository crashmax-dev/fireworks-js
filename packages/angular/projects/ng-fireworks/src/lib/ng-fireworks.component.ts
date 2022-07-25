import { Fireworks } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'
import { isPlatformServer } from '@angular/common'
import { Component, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core'
import type { AfterViewInit, ElementRef, OnDestroy } from '@angular/core'

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

    this.fireworks = new Fireworks(this.container.nativeElement, {
      ...this.options,
      autoresize: false
    })
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
