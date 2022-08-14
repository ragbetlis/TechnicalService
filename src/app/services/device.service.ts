import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device';
import { DeviceDto } from '../models/deviceDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {


  
  apiUrl = "https://localhost:44319/api/Devices/";
 
  constructor(private httpClient:HttpClient) { }

  getDevices():Observable<ListResponseModel<Device>>{
    var newUrl=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Device>>(newUrl);
  }

  getDevicesDto():Observable<ListResponseModel<DeviceDto>>{
    var newUrl=this.apiUrl+"getallDto";
    return this.httpClient.get<ListResponseModel<DeviceDto>>(newUrl);
  }

  getDeviceById(deviceId:number):Observable<Device>{
    var newUrl=this.apiUrl+"getbyid?deviceId="+deviceId;
    return this.httpClient.get<Device>(newUrl);
  }

  addDevice(device:Device):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newUrl,device);
  }

  updateDevice(device:Device):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newUrl,device);
  }

  deleteDevice(device:Device):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newUrl,device);
  }



}
