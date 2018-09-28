import { Routes } from '@angular/router'

import { AddComponent } from './add/add.component'
import { ShowComponent } from './show/show.component'
import { AuthGuard } from '../_guards'

export const InventoryRoutes: Routes = [{
    path: '',
    children: [{
        path: 'show-inv',
        component: ShowComponent,
        canActivate: [AuthGuard]
    }]
}, {
    path: '',
    children: [{
        path: 'add-inv',
        component: AddComponent,
        canActivate: [AuthGuard]
    }]
    }
]
