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



const routes: Routes = [
  { path: "", redirectTo: 'user', pathMatch: 'full' },
  { path: "user", component: UserComponent },
  {
    path: "user", component: UserComponent, children: [
      { path: "", redirectTo: 'user/settings', pathMatch: "full" },
      { path: "settings", component: SettingsComponent
         ,children:[
          {path: "", redirectTo: 'settings/company', pathMatch: "full"},
        {path:"company",component:CompanyComponent},
        {path:"category",component:CategoryComponent},
        {path:"stores",component:StoresComponent}]
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
