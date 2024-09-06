import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './Modules/user/user.component';
import { SettingsComponent } from './Modules/user/components/settings/settings.component';
import { ItemsComponent } from './Modules/user/components/items/items.component';
import { StockAdjustemntComponent } from './Modules/user/components/stock-adjustemnt/stock-adjustemnt.component';
import { ManualScanComponent } from './Modules/user/components/manual-scan/manual-scan.component';
import { CompanyComponent } from './Modules/user/components/settings/company/company.component';
import { CategoryComponent } from './Modules/user/components/settings/category/category.component';
import { StoresComponent } from './Modules/user/components/settings/stores/stores.component';
import { LoginComponent } from './pages/login/login.component';
import { MainStoreComponent } from './Modules/user/components/settings/stores/pages/main-store/main-store.component';
import { SubStoreComponent } from './Modules/user/components/settings/stores/pages/sub-store/sub-store.component';
import { IslandComponent } from './Modules/user/components/settings/stores/pages/island/island.component';



const routes: Routes = [
  { path: "", redirectTo: 'user/items', pathMatch: 'full' },
  {path:"login",component:LoginComponent},
  { path: "user", component: UserComponent },
  {
    path: "user", component: UserComponent, children: [
      { path: "", redirectTo: 'user/settings', pathMatch: "full" },
      { path: "settings", component: SettingsComponent
         ,children:[
          {path: "", redirectTo: 'settings/company', pathMatch: "full"},
        {path:"company",component:CompanyComponent},
        {path:"category",component:CategoryComponent},
        {path:"stores",component:StoresComponent, children:[
          { path: "", redirectTo: 'user/settings/store', pathMatch: "full" },
          {path:"main-store",component:MainStoreComponent}, 
          {path:"sub-store",component:SubStoreComponent},
          {path:"island",component:IslandComponent},
        ]}]
      },
      { path: "items", component: ItemsComponent },
      { path: "stock-adjustemnt", component: StockAdjustemntComponent },
      { path: "manual-scan", component: ManualScanComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
