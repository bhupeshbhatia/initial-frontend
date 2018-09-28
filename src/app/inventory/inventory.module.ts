import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AgGridModule } from 'ag-grid-angular'
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InventoryRoutes } from './inventory.routing'

import { AddComponent } from './add/add.component'
import { ShowComponent } from './show/show.component'
import { Inventory } from "../_models/inventory"
// import { InvDashComponent } from './inv-dash/inv-dash.component'
// import { AlertService } from '../_services'
// import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component'


import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule

 } from "@angular/material";
import { DialogDataDialog } from './dialog-data/dialog-data.component'
@NgModule({
    imports: [
        AgGridModule.withComponents([]),
        CommonModule,
        RouterModule.forChild(InventoryRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatOptionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule
    ],
    declarations: [
        AddComponent,
        ShowComponent,
        DialogDataDialog,
        DialogDataDialog
        // InvDashComponent
        // FieldErrorDisplayComponent,
    ],
    providers: [
        // AlertService
        Inventory
    ],
    entryComponents: [
        DialogDataDialog
    ]
})

export class InventoryModule {}
