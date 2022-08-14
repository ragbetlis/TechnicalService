import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cities:City[]=[];
  city?:City;
  constructor(private cityService:CityService) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(){
    this.cityService.getCities().subscribe(response=>{
      this.cities = response.data;
    },responseError=>{
      console.log(responseError.error.error)
    })
  }

  getCityById(cityId:number){
    this.cityService.getCityById(cityId).subscribe(response=>{
      this.city=response
    },responseError=>{
      console.log(responseError.error.error)
    })
  }

  addCity(city : City)
  {
    this.cityService.addCity(city).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getCities();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }

  updateCity(city : City)
  {
    this.cityService.updateCity(city).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getCities();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }


  deleteCity(city : City)
  {
    this.cityService.deleteCity(city).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getCities();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }


}
