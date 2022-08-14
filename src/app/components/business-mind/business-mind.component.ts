import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brand } from 'src/app/models/brand';
import { Customer } from 'src/app/models/customer';
import { DeviceDto } from 'src/app/models/deviceDto';
import { Group } from 'src/app/models/group';
import { Model } from 'src/app/models/model';
import { CustomerService } from 'src/app/services/customer.service';
import { DeviceService } from 'src/app/services/device.service';


@Component({
  selector: 'app-business-mind',
  templateUrl: './business-mind.component.html',
  styleUrls: ['./business-mind.component.css']
})
export class BusinessMindComponent implements OnInit {

  deviceDtos:DeviceDto[];
  deviceDto:DeviceDto;
  customers:Customer[];
  customer:Customer


  constructor(
    private deviceService:DeviceService,
    private customerService:CustomerService,
    private matSnackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getDeviceDtos();
  }

  getDeviceDtos(){
    this.deviceService.getDevicesDto().subscribe(response=>{
      this.deviceDtos=response.data
    },responseError=>{
      this.matSnackBar.open(responseError.error.error,"Eror",{duration:3000});
    })
  }

}
