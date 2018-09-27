import { Routes } from '@angular/router';

import { AuthGuard } from '../_guards';
import { CarbonComponent } from './carbon/carbon.component';
import { EthyleneComponent } from "./ethylene/ethylene.component";
import { SensorComponent } from "./sensor/sensor.component";
import { TemperatureComponent } from "./temperature/temperature.component";

export const InventoryRoutes: Routes = [{
    path: '',
    children: [{
        path: 'carbon',
        component: CarbonComponent,
        canActivate: [AuthGuard]
    }]
}, {
    path: '',
        children: [{
            path: 'ethylene',
            component: EthyleneComponent,
            canActivate: [AuthGuard]
        }]
}, {
    path: '',
        children: [{
            path: 'sensor',
            component: SensorComponent,
            canActivate: [AuthGuard]
        }]
},
{
    path: '',
        children: [{
            path: 'sensor',
            component: SensorComponent,
            canActivate: [AuthGuard]
        }]
},
    {
        path: '',
        children: [{
            path: 'temperature',
            component: TemperatureComponent,
            canActivate: [AuthGuard]
        }]
    }
];
