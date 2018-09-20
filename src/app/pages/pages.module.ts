import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { PagesRoutes } from './pages.routing'

import { RegisterComponent } from './register/register.component'
import { LockComponent } from './lock/lock.component'
import { LoginComponent } from './login/login.component'

// import { AlertComponent } from './../_directives/alert.component'
// import { AlertService } from '../_services'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    declarations: [
        // AlertComponent,
        LoginComponent,
        RegisterComponent,
        LockComponent
    ]
})

export class PagesModule {}
