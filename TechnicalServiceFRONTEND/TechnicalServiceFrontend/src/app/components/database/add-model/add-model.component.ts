import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {
  dataForm:FormGroup
  constructor(private formBuilder:FormBuilder, 
    private modelService: ModelService,
    private matdialogRef:MatDialogRef<AddModelComponent>
    ) { }



  ngOnInit(): void {
    this.setDataForm();
  }

  setDataForm(){
    this.dataForm=this.formBuilder.group({
      modelName:[ "", Validators.required]})
  }

  AddModel(){
    if(this.dataForm?.valid){
      let model=Object.assign(this.dataForm.value);      
      model.modelName=this.dataForm.get('modelName')?.value;
      this.modelService.addModel(model).subscribe(response=>{
        this.matdialogRef.close();
      })
    }
  }
}
