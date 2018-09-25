import { Routes } from '@angular/router';

import { AuthGuard } from '../_guards';
import { MonitoringComponent } from './monitoring.component';

export const InventoryRoutes: Routes = [{
    path: '',
    children: [{
        path: 'show-inv',
        component: ,
        canActivate: [AuthGuard]
    }]
    }
];
