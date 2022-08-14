import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class GroupService {


  apiUrl = "https://localhost:44319/api/Groups/";
 
  constructor(private httpClient:HttpClient) { }

  getGroups():Observable<ListResponseModel<Group>>{
    var newUrl=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Group>>(newUrl);
  }

  getGroupById(groupId:number):Observable<Group>{
    var newUrl=this.apiUrl+"getbyid?groupId="+groupId;
    return this.httpClient.get<Group>(newUrl);
  }

  addGroup(group:Group):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newUrl,group);
  }

  updateGroup(group:Group):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newUrl,group);
  }

  deleteGroup(group:Group):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newUrl,group);
  }


}
