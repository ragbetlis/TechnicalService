import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  apiUrl = "https://localhost:44319/api/Cities/";
 
  constructor(private httpClient:HttpClient) { }

  getCities():Observable<ListResponseModel<City>>{
    var newUrl=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<City>>(newUrl);
  }

  getCityById(cityId:number):Observable<City>{
    var newUrl=this.apiUrl+"getbyid?cityId="+cityId;
    return this.httpClient.get<City>(newUrl);
  }

  addCity(city:City):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newUrl,city);
  }

  updateCity(city:City):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newUrl,city);
  }

  deleteCity(city:City):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newUrl,city);
  }


}
