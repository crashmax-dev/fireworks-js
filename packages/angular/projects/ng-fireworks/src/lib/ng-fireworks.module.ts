import { NgModule } from '@angular/core'
import { FireworksComponent } from './ng-fireworks.component'
import { FIREWORKS_PROPS } from './ng-fireworks.models'
import type { FireworksProps } from './ng-fireworks.models'
import type { ModuleWithProviders } from '@angular/core'

@NgModule({
  declarations: [
    FireworksComponent
  ],
  exports: [
    FireworksComponent
  ]
})
export class FireworksModule {
  static withConfig(props: FireworksProps): ModuleWithProviders<FireworksModule> {
    console.log(props)
    return {
      ngModule: FireworksComponent,
      providers: [{ provide: FIREWORKS_PROPS, useValue: props }]
    }
  }
}
