import { Routes } from '@angular/router'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component'
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component'
import { AuthGuard } from './_guards'

export const AppRoutes: Routes = [{
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }, {
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            canActivate: [AuthGuard],
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        }, {
            path: 'inventory',
            loadChildren: './inventory/inventory.module#InventoryModule',
            canActivate: [AuthGuard]
        }, {
            path: 'employee',
            loadChildren: './employee/employee.module#EmployeeModule',
            canActivate: [AuthGuard]
        }, {
            path: 'components',
            loadChildren: './components/components.module#ComponentsModule'
        }, {
            path: 'forms',
            loadChildren: './forms/forms.module#Forms'
        }, {
            path: 'tables',
            loadChildren: './tables/tables.module#TablesModule'
        }, {
            path: 'maps',
            loadChildren: './maps/maps.module#MapsModule'
        }, {
            path: 'charts',
            loadChildren: './charts/charts.module#ChartsModule'
        }, {
            path: 'calendar',
            loadChildren: './calendar/calendar.module#CalendarModule'
        }, {
            path: '',
            loadChildren: './userpage/user.module#UserModule'
        }, {
            path: '',
            loadChildren: './timeline/timeline.module#TimelineModule'
        }, {
            path: '',
            loadChildren: './widgets/widgets.module#WidgetsModule'
        }]
        }, {
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule'
            },{
                path: '',
                canActivate: [AuthGuard],
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'inventory',
                loadChildren: './inventory/inventory.module#InventoryModule',
                canActivate: [AuthGuard]
            }, {
                path: 'employee',
                loadChildren: './employee/employee.module#EmployeeModule',
                canActivate: [AuthGuard]
            }]
        },
        {
            path: '**',
            redirectTo: ''
          }
]
@NgModule({
    imports: [RouterModule.forRoot(AppRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
