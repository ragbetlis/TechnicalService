import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City } from 'src/app/models/city';
import { Customer } from 'src/app/models/customer';
import { Device } from 'src/app/models/device';
import { DeviceDto } from 'src/app/models/deviceDto';
import { CityService } from 'src/app/services/city.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  customers:Customer[];
  customer:Customer;
  currencyCustomer:Customer;
  customerDetailOpen:boolean=false;
  city:City;
  cityName:string;
  customerActivities:DeviceDto[];
  displayCustomerActivities:boolean=false;
  dataLoad:boolean=false;
  addFormOpen:boolean=false;
  dataForm:FormGroup;

  constructor(
    private customerService:CustomerService,
    private cityService:CityService,
    private devciceService:DeviceService,
    private matSnackBar:MatSnackBar,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.getCustomers();
    this.setDataForm();
  }

  setDataForm(){
    this.dataForm=this.formBuilder.group({
      cityId:[0,Validators.required],
      customerName:["",Validators.required],
      contactPerson:["",Validators.required],
      phone:["",Validators.required],
      email:["",Validators.required],
    })
  }

  startAddCustomer(){
    this.addFormOpen=true;
    this.customerDetailOpen=false;
  }
  
  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers = response.data;
      if(this.customers.length>0){
        this.dataLoad=true;
      }
    },responseError=>{
      console.log(responseError.error.error)
    })
  }

  getCustomerById(customerId:number){
    this.customerService.getCustomerById(customerId).subscribe(response=>{
      this.customer=response
    },responseError=>{
      console.log(responseError.error.error)
    })
  }

  addCustomer()
  {
    if(this.dataForm.valid){
      let customer = Object.assign(this.dataForm.value);
      customer.cityId=+this.dataForm.get('cityId')?.value;
      this.customerService.addCustomer(customer).subscribe(response=>{
        this.matSnackBar.open(response.message,"Ok",{duration:4000});
        this.getCustomers();
        this.addFormOpen=false;
      },responseError=>{
        this.matSnackBar.open(responseError.error.error,"error",{duration:3000});
      })
    }else{
      this.matSnackBar.open("Lütfen tüm alanları doldurun.","error",{duration:3000});
    }

  }

  updateCustomer(customer : Customer)
  {
    this.customerService.updateCustomer(customer).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getCustomers();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }


  deleteCustomer(customer : Customer)
  {
    this.customerService.deleteCustomer(customer).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getCustomers();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }
  getCity(cityId:number){
    this.cityService.getCityById(cityId).subscribe(response=>{
      this.city=response;
    })
  }

  getCustomerDetails(customer:Customer){
    this.closeCustomerActivities();
    this.cityService.getCityById(customer.cityId).subscribe(response=>{
    this.cityName=response.cityName;

    })
    this.currencyCustomer=customer;
    this.customerDetailOpen=true;
    this.addFormOpen=false;
   
  }

  getCustomerActivities(){
    this.displayCustomerActivities=true;
    this.devciceService.getDevicesDto().subscribe(response=>{
      this.customerActivities=response.data.filter((d:DeviceDto)=>d.customerId===this.currencyCustomer.customerId)
      if(this.customerActivities.length<=0){
        this.matSnackBar.open("Bu müşteriye ait hareket bulunamadı","",{duration:4000});
      }
    },responseError=>{
      this.matSnackBar.open("Hareketler getirilirken hata oluştu","",{duration:3000});
    })
  }
  
  closeCustomerActivities(){
    this.displayCustomerActivities=false;
  }


}
