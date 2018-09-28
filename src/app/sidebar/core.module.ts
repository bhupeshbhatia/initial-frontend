import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core'

import { CommonModule } from '@angular/common'

import { SidebarComponent } from './sidebar.component'
import { TokenExtraction } from '../_helpers'

@NgModule({
    imports:      [ CommonModule ],
    declarations: [ SidebarComponent ],
    exports:      [ SidebarComponent ],
    providers:    [ TokenExtraction ]
  })
  export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
      if (parentModule) {
        throw new Error(
          'CoreModule is already loaded. Import it in the AppModule only')
      }
    }

    static forRoot(token: TokenExtraction): ModuleWithProviders {
      return {
        ngModule: CoreModule,
        providers: [
          {provide: TokenExtraction, useValue: token }
        ]
      }
    }
  }