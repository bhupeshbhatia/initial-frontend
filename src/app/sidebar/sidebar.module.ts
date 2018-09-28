import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SidebarComponent } from './sidebar.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { TokenExtraction } from '../_helpers'

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModule ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}


