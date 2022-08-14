import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Model } from '../models/model';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  apiUrl = "https://localhost:44319/api/Models/";
 
  constructor(private httpClient:HttpClient) { }

  getModels():Observable<ListResponseModel<Model>>{
    var newUrl=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Model>>(newUrl);
  }

  getModelById(modelId:number):Observable<Model>{
    var newUrl=this.apiUrl+"getbyid?modelId="+modelId;
    return this.httpClient.get<Model>(newUrl);
  }

  addModel(model:Model):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newUrl,model);
  }

  updateModel(model:Model):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newUrl,model);
  }

  deleteModel(model:Model):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newUrl,model);
  }
}
