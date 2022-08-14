import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DeviceComponent } from './components/device/device.component';
import { GroupComponent } from './components/group/group.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:MainPageComponent },
  {path:"devices",pathMatch:"full", component:DeviceComponent },
  {path:"customers",pathMatch:"full", component:CustomerComponent },
  {path:"brandModels",pathMatch:"full", component:BrandComponent },
  {path:"groups",pathMatch:"full", component:GroupComponent },
  {path:"main", pathMatch:"full",component:MainPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
