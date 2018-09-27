import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { LoadNumprodDataService } from "../services/load-numprod-data/load-numprod-data.service";
// import { InventoryRoutes } from './monitoring.routing'
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
import { CarbonComponent } from './carbon/carbon.component';
import { EthyleneComponent } from './ethylene/ethylene.component';
import { SensorComponent } from './sensor/sensor.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { OverviewComponent } from './overview/overview.component';
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
        // FieldErrorDisplayComponent,
    CarbonComponent,
        EthyleneComponent,
        SensorComponent,
        TemperatureComponent,
        OverviewComponent],
    providers: [
        // AlertService
        LoadNumprodDataService
    ]
})

export class MonitoringModule {}
