import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Status } from '../models/status';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  apiUrl = "https://localhost:44319/api/Statuses/";
 
  constructor(private httpClient:HttpClient) { }

  getStatuses():Observable<ListResponseModel<Status>>{
    var newUrl=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Status>>(newUrl);
  }

  getStatusById(statusId:number):Observable<Status>{
    var newUrl=this.apiUrl+"getbyid?statusId="+statusId;
    return this.httpClient.get<Status>(newUrl);
  }

  addStatus(status:Status):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newUrl,status);
  }

  updateStatus(status:Status):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newUrl,status);
  }

  deleteStatus(status:Status):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newUrl,status);
  }
}
