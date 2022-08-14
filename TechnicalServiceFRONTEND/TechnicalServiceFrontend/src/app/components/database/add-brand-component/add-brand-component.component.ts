import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrandServiceService } from 'src/app/services/brand-service.service';
import { DeviceComponent } from '../../device/device.component';

@Component({
  selector: 'app-add-brand-component',
  templateUrl: './add-brand-component.component.html',
  styleUrls: ['./add-brand-component.component.css']
})
export class AddBrandComponentComponent implements OnInit {

  dataForm:FormGroup
  constructor(private formBuilder:FormBuilder, 
    private brandService: BrandServiceService,
    private matdialogRef:MatDialogRef<AddBrandComponentComponent>
    ) { }



  ngOnInit(): void {
    this.setDataForm();
  }

  setDataForm(){
    this.dataForm=this.formBuilder.group({
      brandName:[ "", Validators.required]})
  }

  AddBrand(){
    if(this.dataForm?.valid){
      let brand=Object.assign(this.dataForm.value);      
      brand.brandName=this.dataForm.get('brandName')?.value;
      this.brandService.addBrand(brand).subscribe(response=>{
        this.matdialogRef.close();        
      })
    }
  }

}
