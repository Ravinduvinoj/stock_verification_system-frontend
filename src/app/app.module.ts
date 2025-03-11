import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './pages/components/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
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
import { NewComComponent } from './Modules/user/components/settings/company/components/new-com/new-com.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NewCategoryComponent } from './Modules/user/components/settings/category/components/new-category/new-category.component';
import { NewMainStoreComponent } from './Modules/user/components/settings/stores/pages/main-store/components/new-main-store/new-main-store.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewSubStoreComponent } from './Modules/user/components/settings/stores/pages/sub-store/components/new-sub-store/new-sub-store.component';
import { MatSelectModule } from '@angular/material/select';
import { NewIslandComponent } from './Modules/user/components/settings/stores/pages/island/components/new-island/new-island.component';
import { NewSidebarComponent } from './pages/components/new-sidebar/new-sidebar.component';
import { SidebarMenuComponent } from './pages/components/new-sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarSubmenuComponent } from './pages/components/new-sidebar/sidebar-submenu/sidebar-submenu.component';
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
    NewComComponent,
    NewCategoryComponent,
    NewMainStoreComponent,
    NewSubStoreComponent,
    NewIslandComponent,
    NewSidebarComponent,
    SidebarMenuComponent,
    SidebarSubmenuComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatMenuModule,
    HttpClientModule,
    MatSelectModule,

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
