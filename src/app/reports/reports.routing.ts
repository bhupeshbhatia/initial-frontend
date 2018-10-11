import { Routes } from '@angular/router';

import { EthyleneReportComponent } from "./ethylene-report/ethylene-report.component";
import { FlashSaleReportComponent } from "./flash-sale-report/flash-sale-report.component";
import { InventoryReportComponent } from "./inventory-report/inventory-report.component";
import { SavingsReportComponent } from "./savings-report/savings-report.component";
import { SensorReportComponent } from "./sensor-report/sensor-report.component";
import { WasteReportComponent } from "./waste-report/waste-report.component";
import { TemphumidReportComponent } from './temphumid-report/temphumid-report.component';


export const ReportRoutes: Routes = [{
    path: '',
    children: [{
        path: 'ethylene-report',
        component: EthyleneReportComponent
    },
    {
        path: 'flashsale-report',
        component: FlashSaleReportComponent
    },
    {
        path: 'inventory-report',
        component: InventoryReportComponent
    },
    {
        path: 'savings-report',
        component: SavingsReportComponent
    },
    {
        path: 'sensor-report',
        component: SensorReportComponent
    },
    {
        path: 'waste-report',
        component: WasteReportComponent
    },
    {
        path: 'temp-report',
        component: TemphumidReportComponent
    }
    ]
}];