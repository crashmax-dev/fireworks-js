import { NgModule } from '@angular/core'
import { FireworksDirective } from './ng-fireworks.directive'

export type { FireworksOptions } from 'fireworks-js'

@NgModule({
  declarations: [FireworksDirective],
  exports: [FireworksDirective]
})
export class NgFireworksModule {}
