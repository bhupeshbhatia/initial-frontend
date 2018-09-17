import { Routes } from '@angular/router';

import { AddComponent } from './add/add.component';
import { ShowComponent } from './show/show.component';

export const InventoryRoutes: Routes = [{
    path: '',
    children: [{
        path: 'show',
        component: ShowComponent
    }]
},{
    path: '',
    children: [{
        path: 'add',
        component: AddComponent
    }]
}
];