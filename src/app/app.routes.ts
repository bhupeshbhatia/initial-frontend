import { DashboardComponent } from "./dashboard/dashboard.component"
import { LoginPageComponent } from "./login-page/login-page.component"
import { AddComponent } from "./inventory/add/add.component"
import { UserTableComponent } from "./employee/user-table/user-table.component"
import { InventoryRoutes } from "./inventory/inventory.routes";
import { ReportsRoutes } from "./reports/reports.routes";

export const AppRoutes = {
  root: {
    path: '',
    title: 'Dashboard',
    component: DashboardComponent
  },

  dashboard: {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent
  },

  employee: {
    title: 'Employees',
    path: 'employee/show-employees',
    component: UserTableComponent
  },

  inventory: {
    path: 'inventory',
    title: 'Inventory',
    children: InventoryRoutes
  },

  reports: {
    path: 'reports',
    title: 'Reports',
    children: ReportsRoutes
  },

  monitoring: {
    path: 'monitoring',
    title: 'Monitoring',
    component: AddComponent
  },

  login: {
    path: 'login',
    title: 'Login',
    isPublic: true,
    component: LoginPageComponent
  }
}
