import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeRoutes } from './employee.routing';

import { RegisterEmpComponent } from './register-emp/register-emp.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(EmployeeRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [
        RegisterEmpComponent
    ]
})

export class EmployeeModule {}
