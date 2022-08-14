import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brand } from 'src/app/models/brand';
import { Model } from 'src/app/models/model';
import { BrandServiceService } from 'src/app/services/brand-service.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[];
  brand:Brand;
  models:Model[];
  model:Model;
  brandAddForm:FormGroup;
  modelAddForm:FormGroup;
  dataLoad:boolean=false;
  constructor(
    private brandService: BrandServiceService, 
    private modelService: ModelService,
    private formBuilder:FormBuilder,
    private matSnackBar:MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getModels();
    this.setDataForm();
    this.setModelDataForm();
  }

  setDataForm(){
    this.brandAddForm=this.formBuilder.group({      
      brandName:["",Validators.required]
    })
  }
  setModelDataForm(){
    this.modelAddForm=this.formBuilder.group({
      modelName:["",Validators.required]
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
      this.dataLoad=true;
    },responseError=>{
      console.log(responseError.error.error)
    })
  }

  getBrandById(brandId:number){
    this.brandService.getBrandById(brandId).subscribe(response=>{
      this.brand=response
      console.log(this.brands)
    },responseError=>{
      this.matSnackBar.open(responseError.error.error,"",{duration:3000})
    })
  }

  addBrand()
  {   
    if(this.brandAddForm?.valid){
      let brand=Object.assign(this.brandAddForm.value);
      brand.brandName=this.brandAddForm.get('brandName')?.value;
      this.brandService.addBrand(brand).subscribe(response=>{             
          this.matSnackBar.open("Marka Eklendi","",{duration:3000});
          this.getBrands();
        },responseError=>{
          console.log(responseError.error.error)

        })  
  }}

  deleteBrand(brand:Brand){
    this.brandService.deleteBrand(brand).subscribe(response=>{
      this.matSnackBar.open("Kayıt silindi","Ok",{duration:3000});
      this.getBrands();
    },responseError=>{
      this.matSnackBar.open(responseError.error.error,"error",{duration:3000})
    })
   
  }
 /* updateBrand(brand : Brand)
  {
    this.brandService.updateBrand(brand).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getBrands();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }


  deleteBrand(brand : Brand)
  {
    this.brandService.deleteBrand(brand).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getBrands();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }*/

  getModels(){
    this.modelService.getModels().subscribe(response=>{
      this.models=response.data
    })
  }
  addModel(){
    if(this.modelAddForm.valid){
      let model=Object.assign({},this.modelAddForm.value)
      this.modelService.addModel(model).subscribe(response=>{
        this.matSnackBar.open("Model Eklendi","",{duration:3000});
        this.getModels();
      },responseError=>{
        this.matSnackBar.open(responseError.error.error,"",{duration:3000})
      });
    }

  }

  deleteModel(model:Model){
    this.modelService.deleteModel(model).subscribe(response=>{
      this.matSnackBar.open("Kayıt silindi","Ok",{duration:3000});
      this.getModels();
    },responseError=>{
      this.matSnackBar.open(responseError.error.error,"error",{duration:3000})
    })
  
  }

}
