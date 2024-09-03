import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './pages/components/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './pages/components/header/header.component';
import { UserComponent } from './Modules/user/user.component';
import { SettingsComponent } from './Modules/user/components/settings/settings.component';
import { ItemsComponent } from './Modules/user/components/items/items.component';
import { StockAdjustemntComponent } from './Modules/user/components/stock-adjustemnt/stock-adjustemnt.component';
import { ManualScanComponent } from './Modules/user/components/manual-scan/manual-scan.component';
import { CompanyComponent } from './Modules/user/components/settings/company/company.component';
import { CategoryComponent } from './Modules/user/components/settings/category/category.component';
import { StoresComponent } from './Modules/user/components/settings/stores/stores.component';
import { MainStoreComponent } from './Modules/user/components/settings/stores/pages/main-store/main-store.component';
import { SubStoreComponent } from './Modules/user/components/settings/stores/pages/sub-store/sub-store.component';
import { IslandComponent } from './Modules/user/components/settings/stores/pages/island/island.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    HeaderComponent,
    UserComponent,
    SettingsComponent,
    ItemsComponent,
    StockAdjustemntComponent,
    ManualScanComponent,
    CompanyComponent,
    CategoryComponent,
    StoresComponent,
    MainStoreComponent,
    SubStoreComponent,
    IslandComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
