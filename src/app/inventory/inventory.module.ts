import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryRoutes } from './inventory.routing';

import { AddComponent } from './add/add.component';
import { ShowComponent } from './show/show.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(InventoryRoutes),
        FormsModule
    ],
    declarations: [
        AddComponent,
        ShowComponent
    ]
})

export class InventoryModule {}
