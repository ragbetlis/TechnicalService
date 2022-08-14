import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { Customer } from 'src/app/models/customer';
import { Group } from 'src/app/models/group';
import { Model } from 'src/app/models/model';
import { Status } from 'src/app/models/status';
import { BrandServiceService } from 'src/app/services/brand-service.service';
import { CustomerService } from 'src/app/services/customer.service';
import { GroupService } from 'src/app/services/group.service';
import { ModelService } from 'src/app/services/model.service';
import { StatusService } from 'src/app/services/status.service';
import { StatusComponent } from '../../status/status.component';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  dataForm:FormGroup;
  brands:Brand[];
  models:Model[];
  groups:Group[];
  customers:Customer[];
  statuses:Status[];
  

  constructor(
    private formBuilder:FormBuilder,
    private brandService:BrandServiceService,
    private modelService:ModelService,
    private customerService:CustomerService,
    private statusService:StatusService,
    private groupService:GroupService
    
    ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  

  getAllData(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
    this.modelService.getModels().subscribe(response=>{
      this.models=response.data
    })
    this.customerService.getCustomers().subscribe(response=>{
      this.customers=response.data
    })
    this.statusService.getStatuses().subscribe(response=>{
      this.statuses=response.data
    })
    this.groupService.getGroups().subscribe(response=>{
      this.groups=response.data
    })
  }

}
