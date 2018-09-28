import { AuthGuard } from './_guards/auth.guard'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { APP_BASE_HREF } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserModule } from "@angular/platform-browser"
import { AppComponent }   from './app.component'
import { AppRoutingModule } from "./app.routing"

import { SidebarModule } from './sidebar/sidebar.module'
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module'
import { FooterModule } from './shared/footer/footer.module'
import { NavbarModule} from './shared/navbar/navbar.module'
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component'
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component'
import { AppRoutes } from './app.routing'
import { LoadInventoryJsonService } from './services/load-inventory-json/load-inventory-json.service'
import { LoadNumprodDataService } from "./services/load-numprod-data/load-numprod-data.service"
import { LoadWeightDistDataService } from "./services/load-weight-dist-data/load-weight-dist-data.service"
import { PostInventoryDataService } from "./services/post-inventory-data/post-inventory-data.service"
import { PostDeleteDataService } from "./services/post-delete-data/post-delete-data.service"
import { PostDDateDataService } from "./services/post-date-data/post-date-data.service"
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import {
    ErrorInterceptor,
    fakeBackendProvider,
    JwtInterceptor,
    TokenExtraction

} from './_helpers'
import { AuthenticationService, UserService } from './_services'
// import { AlertComponent } from './_directives/alert.component'
// import { AlertService } from './_services/alert.service'
// import { AddComponent } from './inventory/add/add.component'

// used to create fake backend


@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes),
        NgbModule.forRoot(),
        HttpClientModule,
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent
        // AlertComponent
    ],
    providers: [
        AuthGuard,
        // AlertService,
        AuthenticationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        TokenExtraction,
        UserService,
        fakeBackendProvider,
        LoadInventoryJsonService,
        LoadNumprodDataService,
        LoadWeightDistDataService,
        PostInventoryDataService,
        PostDDateDataService,
        PostDeleteDataService
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
