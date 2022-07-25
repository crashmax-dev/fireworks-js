import { NgModule } from '@angular/core'
import {
  FireworksComponent,
  NgFireworksComponent
} from './ng-fireworks.component'
import type { FireworksProps } from './ng-fireworks.component'

@NgModule({
  declarations: [NgFireworksComponent, FireworksComponent],
  exports: [NgFireworksComponent, FireworksComponent]
})
export class NgFireworksModule {}
export type { FireworksProps }
