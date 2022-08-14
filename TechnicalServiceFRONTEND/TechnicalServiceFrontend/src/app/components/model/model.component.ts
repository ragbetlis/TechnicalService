import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/model';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {


  models:Model[]=[];
  model?:Model;
  constructor(private modelService:ModelService) { }

  ngOnInit(): void {
    this.getModels();
  }

  getModels(){
    this.modelService.getModels().subscribe(response=>{
      this.models = response.data;
    },responseError=>{
      console.log(responseError.error.error)
    })
  }

  getModelById(modelId:number){
    this.modelService.getModelById(modelId).subscribe(response=>{
      this.model=response
    },responseError=>{
      console.log(responseError.error.error)
    })
  }

  addModel(model : Model)
  {
    this.modelService.addModel(model).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getModels();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }

  updateModel(model : Model)
  {
    this.modelService.updateModel(model).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getModels();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }


  deleteModel(model : Model)
  {
    this.modelService.deleteModel(model).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getModels();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }


}
