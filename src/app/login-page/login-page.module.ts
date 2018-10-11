import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { LoginRoutes } from './login-page.routing';

import { LoginPageComponent } from './login-page.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(LoginRoutes),
        FormsModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginPageComponent,
    ]
})

export class LoginPageModule { }
