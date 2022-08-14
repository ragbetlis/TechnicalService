import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { Customer } from 'src/app/models/customer';
import { Device } from 'src/app/models/device';
import { Group } from 'src/app/models/group';
import { Model } from 'src/app/models/model';
import { Status } from 'src/app/models/status';
import { BrandServiceService } from 'src/app/services/brand-service.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DeviceService } from 'src/app/services/device.service';
import { GroupService } from 'src/app/services/group.service';
import { ModelService } from 'src/app/services/model.service';
import { StatusService } from 'src/app/services/status.service';
import { MatDialog} from '@angular/material/dialog';
import { DeviceDto } from 'src/app/models/deviceDto';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBrandComponentComponent } from '../database/add-brand-component/add-brand-component.component';
import { AddModelComponent } from '../database/add-model/add-model.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  dataForm:FormGroup;
  devices:Device[]=[];
  devicesDtos:DeviceDto[];
  device?:Device;
  brands:Brand[]=[];
  models:Model[]=[];
  groups:Group[]=[];
  customers:Customer[]=[];
  statuses:Status[]=[];
  addDeviceFormOpen:boolean=false;
  updateDeviceForm:boolean=false;
  find:string;
  selectBrand:Brand;
  selectModel:Model;
  selectGroup:Group;
  selectCustomer:Customer;
  selectStatus:Status;
  currencyDeviceDto:DeviceDto;
  deviceStatus:boolean=false;
  passiveDevices:boolean=false;
  document:Document;


  constructor(
   
    private deviceService:DeviceService,
    private brandService:BrandServiceService,
    private modelService:ModelService,
    private groupService:GroupService,
    private customerService:CustomerService,
    private statusService:StatusService,
    private matDialog:MatDialog,
    private matSnackBar : MatSnackBar,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.getDevices();
    this.getBrands();
    this.getModels();
    this.getGroups();
    this.getCustomers();
    this.getStatus();
    this.setDataForm();
    this.getDevicesDto();
  }


  setDataForm(){
    this.dataForm=this.formBuilder.group({
      brandId:[0, Validators.required],
      modelId:[0, Validators.required],
      groupId:[ 0, Validators.required],
      customerId:[ 0, Validators.required],
      status:[ true, Validators.required],
      barkod:[ "", Validators.required],
      seriNo:[ "", Validators.required],
      description:["", Validators.required]  
  
    });
  }

  setDataFormForUpdate(deviceDto:DeviceDto)
  {
    let currentStatus;
    if(this.deviceStatus === true){
      currentStatus=2
    }else{currentStatus=1}
    this.dataForm=this.formBuilder.group({
      brandId:[ deviceDto.brandId, Validators.required],
      modelId:[deviceDto.modelId, Validators.required],
      groupId:[deviceDto.groupId, Validators.required],
      customerId:[ deviceDto.customerId, Validators.required],
      status:[ deviceDto.status, Validators.required],
      barkod:[ deviceDto.barkod, Validators.required],
      seriNo:[ deviceDto.seriNo, Validators.required],
      description:[deviceDto.description,Validators.required]    
    });
    this.currencyDeviceDto=deviceDto;
  }

  getDevices(){
    this.deviceService.getDevices().subscribe(response=>{
      this.devices = response.data;
      
    },responseError=>{
      console.log(responseError.error.error)
    })
  }
  closeAddForm(){
    this.addDeviceFormOpen=false;
    this.updateDeviceForm=false;
}
 
  getDevicesDto(){
    if(this.passiveDevices===true){
      this.deviceService.getDevicesDto().subscribe(response=>{
        this.devicesDtos = response.data.sort((d:DeviceDto, b:DeviceDto)=>{return d.customerId - b.customerId}); 
      },responseError=>{
        console.log(responseError.error.error)
      })
    }else{
        this.deviceService.getDevicesDto().subscribe(response=>{
          this.devicesDtos = response.data.filter((d : DeviceDto)=>d.status===true).sort((d:DeviceDto, b:DeviceDto)=>{return d.customerId - b.customerId}); 
        },responseError=>{
          console.log(responseError.error.error)
        })
    
  }
  }

  getClassName(deviceDto:DeviceDto){
    if(deviceDto.status===true){
      return "card";
    }else{
      return "card cardPassive";
    }
  }

  getDevicesFilter(){
    
    this.devicesDtos = this.devicesDtos.filter((d : DeviceDto)=>d.seriNo===this.find || d.brandName.toLocaleLowerCase()===this.find.toLocaleLowerCase() || d.modelName.toLocaleLowerCase()===this.find.toLocaleLowerCase() || d.groupName.toLocaleLowerCase()===this.find.toLocaleLowerCase() || d.customerName.toLocaleLowerCase() === this.find.toLocaleLowerCase());
    if(this.devicesDtos.length<=0){
      this.getDevicesDto();
    }
  }


  getDeviceById(deviceId:number){
    this.deviceService.getDeviceById(deviceId).subscribe(response=>{
      this.device=response
    },responseError=>{
      console.log(responseError.error.error)
    })
  }

  addDevice()
  {
    if(this.dataForm?.valid){
      let addDevice=Object.assign(this.dataForm.value);
      
      addDevice.brandId=+this.dataForm.get('brandId')?.value;
      addDevice.modelId=+this.dataForm.get('modelId')?.value;
      addDevice.groupId=+this.dataForm.get('groupId')?.value;
      addDevice.customerId=+this.dataForm.get('customerId')?.value;
      addDevice.barkod=this.dataForm.get('barkod')?.value;
      addDevice.seriNo=this.dataForm.get('seriNo')?.value;
      addDevice.takeDate=formatDate(new Date(),'yyyy-MM-dd','en');
      addDevice.returnDate=formatDate(new Date(),'yyyy-MM-dd','en');
      addDevice.imagePath="https://icons.iconarchive.com/icons/pelfusion/long-shadow-media/96/Camera-icon.png";

      this.deviceService.addDevice(addDevice).subscribe(response=>{
        this.matSnackBar.open(response.message,"",{duration:4000})
      this.addDeviceFormOpen=false;
      this.getDevicesDto();
      },responseError=>{
        console.log(responseError.error.error)
      })
    }
    else{
      this.matSnackBar.open("Lütfen Tüm Bilgileri Eksiksiz Girerek Yeniden Deneyiniz","",{duration:3000})
    }
  }

  updateDeviceStart(deviceDto:DeviceDto){

    this.updateDeviceForm=true;
    this.setDataFormForUpdate(deviceDto);    
    if(this.currencyDeviceDto.status===false){
      this.currencyDeviceDto.returnDate = new Date();
    }else{this.currencyDeviceDto.returnDate=deviceDto.returnDate}
    this.currencyDeviceDto.returnDate
  }

  updateDevice()
  {

    if(this.dataForm?.valid){
    let updateDevice=Object.assign(this.dataForm.value);
      
    updateDevice.deviceId=this.currencyDeviceDto.deviceId;
    updateDevice.brandId=+this.dataForm.get('brandId')?.value;
    updateDevice.modelId=+this.dataForm.get('modelId')?.value;
    updateDevice.groupId=+this.dataForm.get('groupId')?.value;
    updateDevice.customerId=+this.dataForm.get('customerId')?.value;
    updateDevice.barkod=this.dataForm.get('barkod')?.value;
    updateDevice.seriNo=this.dataForm.get('seriNo')?.value;
    updateDevice.takeDate=formatDate(new Date(),'yyyy-MM-dd','en');
    updateDevice.returnDate=formatDate(new Date(),'yyyy-MM-dd','en');
    updateDevice.status=this.dataForm.get('status')?.value;
    updateDevice.imagePath="https://icons.iconarchive.com/icons/pelfusion/long-shadow-media/96/Camera-icon.png";
 
    if(this.dataForm?.valid){
      this.deviceService.updateDevice(updateDevice).subscribe(response=>{
        this.matSnackBar.open(response.message,"",{duration:3000})
        this.getDevicesDto();
    });
    this.getDevicesDto();
    }
  }else{
    this.matSnackBar.open("Lütfen Tüm Bilgileri Eksiksiz Girerek Yeniden Deneyiniz","",{duration:3000})
  }

  }


  deleteDevice(device : Device)
  {
    this.deviceService.deleteDevice(device).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getDevices();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(respoonse=>{
      this.brands=respoonse.data
    },respoonseError=>{console.log(respoonseError.error.error)})
  }

  getModels(){
    this.modelService.getModels().subscribe(respoonse=>{
      this.models=respoonse.data
    },respoonseError=>{console.log(respoonseError.error.error)})
  }
  getGroups(){
    this.groupService.getGroups().subscribe(respoonse=>{
      this.groups=respoonse.data
    },respoonseError=>{console.log(respoonseError.error.error)})
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(respoonse=>{
      this.customers=respoonse.data
    },respoonseError=>{console.log(respoonseError.error.error)})
  }

  getStatus(){
    this.statusService.getStatuses().subscribe(respoonse=>{
      this.statuses=respoonse.data
    },respoonseError=>{console.log(respoonseError.error.error)})
  }

  addDeviceStart(){
    this.addDeviceFormOpen=true;
    this.updateDeviceForm=false;
    this.setDataForm();
  }


  openAddModelDailog(){
    this.matDialog.open(AddModelComponent);
  }
  openAddBrandDialog(){
    this.matDialog.open(AddBrandComponentComponent);
  }
 
  
}
