import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InventoryRoutes } from './inventory.routing';

import { AddComponent } from './add/add.component';
import { ShowComponent } from './show/show.component';
// import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(InventoryRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [
        AddComponent,
        ShowComponent
        // FieldErrorDisplayComponent
    ]
})

export class InventoryModule {}
