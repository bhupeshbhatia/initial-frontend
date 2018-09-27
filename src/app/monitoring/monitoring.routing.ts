import { Routes } from '@angular/router';

import { AuthGuard } from '../_guards';
import { MonitoringComponent } from './monitoring.component';
import { CarbonComponent } from './carbon/carbon.component';

export const MonitoringRoutes: Routes = [{
    path: '',
    children: [{
        path: 'carbon',
        component: CarbonComponent,
        canActivate: [AuthGuard]
    }]
}]
