import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { CityComponent } from './components/city/city.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelComponent } from './components/model/model.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DeviceComponent } from './components/device/device.component';
import { GroupComponent } from './components/group/group.component';
import { StatusComponent } from './components/status/status.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AddBrandComponentComponent } from './components/database/add-brand-component/add-brand-component.component';
import { AddModelComponent } from './components/database/add-model/add-model.component';
import { BrandUpdateComponent } from './components/database/brand-update/brand-update.component';
import { BusinessMindComponent } from './components/business-mind/business-mind.component';





@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CityComponent,
    ModelComponent,
    CustomerComponent,
    DeviceComponent,
    GroupComponent,
    StatusComponent,
    MainPageComponent,
    HeaderComponent,
    CategoryComponent,
    AddBrandComponentComponent,
    AddModelComponent,
    BrandUpdateComponent,
    BusinessMindComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
