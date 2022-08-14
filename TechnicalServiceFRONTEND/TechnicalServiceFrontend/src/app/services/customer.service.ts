import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44319/api/Customers/";
 
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    var newUrl=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newUrl);
  }

  getCustomerById(customerId:number):Observable<Customer>{
    var newUrl=this.apiUrl+"getbyid?customerId="+customerId;
    return this.httpClient.get<Customer>(newUrl);
  }

  addCustomer(customer:Customer):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newUrl,customer);
  }

  updateCustomer(customer:Customer):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newUrl,customer);
  }

  deleteCustomer(customer:Customer):Observable<ResponseModel>{
    var newUrl=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newUrl,customer);
  }


}
