import { ShowComponent } from './inventory/show/show.component';
import { AddComponent } from './inventory/add/add.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { DashboardModule } from './dashboard/dashboard.module'
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { LoginPageModule } from './login-page/login-page.module';
import { CommonModule } from '@angular/common'

import { AppRoutingModule } from './app.routing';

import { AuthGuard } from './_Auth/auth.guard'
import { JWTService } from './_Auth/jwt.service'
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
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { DialogDataDialog } from './inventory/dialog-data/dialog-data.component'

import { UserAddComponent } from './employee/user-add/user-add.component'
import { UserTableComponent } from './employee/user-table/user-table.component'

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AddComponent,
    ShowComponent,
    DialogDataDialog,
    UserAddComponent,
    UserTableComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SidebarModule,
    ReactiveFormsModule,
    DashboardModule,
    HttpModule,
    HttpClientModule,
    FixedPluginModule,
    FooterModule,
    NavbarModule,
    LoginPageModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  providers: [
    AuthGuard,
    JWTService,
  ],
  entryComponents: [
    DialogDataDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
