import { Routes } from '@angular/router';

import { RegisterEmpComponent } from './register-emp/register-emp.component';

export const EmployeeRoutes: Routes = [{
    path: '',
    children: [{
        path: 'register',
        component: RegisterEmpComponent
    }]
}
];