import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})

export class BrandServiceService {
  apiUrl = "https://localhost:44319/api/Brands/";
 
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    var newUrl=this.apiUrl+"getall";
    var result= this.httpClient.get<ListResponseModel<Brand>>(newUrl);
    console.log(result);
    return result;
  }

  getBrandById(brandId:number):Observable<Brand>{
    var newUrl=this.apiUrl+"getbyid?brandId="+brandId;
    return this.httpClient.get<Brand>(newUrl);
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }

}
