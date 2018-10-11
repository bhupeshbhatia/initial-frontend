import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ReportRoutes } from "./reports.routing";
import { CdkTableModule } from '@angular/cdk/table';
import { EthyleneReportComponent } from "./ethylene-report/ethylene-report.component";
import { FlashSaleReportComponent } from "./flash-sale-report/flash-sale-report.component";
import { InventoryReportComponent } from "./inventory-report/inventory-report.component";
import { SavingsReportComponent } from "./savings-report/savings-report.component";
import { SensorReportComponent } from "./sensor-report/sensor-report.component";
import { WasteReportComponent } from "./waste-report/waste-report.component";
import {
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    MatGridListModule,
    MatGridTile,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';
import { GenericGraphComponent } from './generic-graph/generic-graph.component'
import { ReportsTableComponent } from '../reports-table/reports-table.component';
import { TemphumidReportComponent } from './temphumid-report/temphumid-report.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    imports: [
        CommonModule,
        CdkTableModule,
        RouterModule.forChild(ReportRoutes),
        FormsModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatButtonModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    declarations: [
        EthyleneReportComponent,
        FlashSaleReportComponent,
        InventoryReportComponent,
        SavingsReportComponent,
        SensorReportComponent,
        WasteReportComponent,
        GenericGraphComponent,
        ReportsTableComponent,
        TemphumidReportComponent,
        SearchComponent
    ]
})

export class ReportsModule { }
