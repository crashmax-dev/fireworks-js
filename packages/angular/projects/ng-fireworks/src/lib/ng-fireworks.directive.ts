import { Directive, ElementRef, Input } from '@angular/core'
import { Fireworks } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'

@Directive({
  selector: '[ngFireworks], ng-fireworks',
  exportAs: 'ngFireworks'
})
export class FireworksDirective extends Fireworks {
  constructor(elRef: ElementRef) {
    super(elRef.nativeElement)
  }

  @Input() options!: FireworksOptions

  private ngOnInit() {
    this.updateOptions(this.options)
    this.updateSize()
    this.start()
  }

  private ngOnDestroy(): void {
    this.stop()
  }
}
