import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {


  groups:Group[]=[];
  group?:Group;
  groupAddForm:FormGroup;
  dataLoad:boolean=false;
  
  constructor(
    private groupService:GroupService,
    private formBuilder:FormBuilder,
    private matSnackBar:MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getGroups();
    this.setDataForm();
  }

  setDataForm(){
    this.groupAddForm=this.formBuilder.group({
      groupName:["",Validators.required]
    })
  }
  getGroups(){
    this.groupService.getGroups().subscribe(response=>{
      this.groups = response.data;
      this.dataLoad=true;
    },responseError=>{
      console.log(responseError.error.error)
    })
  }

  getGroupById(groupId:number){
    this.groupService.getGroupById(groupId).subscribe(response=>{
      this.group=response
    },responseError=>{
      console.log(responseError.error.error)
    })
  }

  addGroup()
  {
    if(this.groupAddForm.valid){
      let group=Object.assign(this.groupAddForm.value);
      group.groupName=this.groupAddForm.get('groupName')?.value;

      this.groupService.addGroup(group).subscribe(response=>{
        this.matSnackBar.open("Kayıt Eklendi","Ok",{duration:3000});
        this.getGroups();
      })
    }else{
      this.matSnackBar.open("Lütfen Grup ilgisini eksiksiz giriniz.","Error",{duration:3000});
    }
  }

  updateGroup(group : Group)
  {
    this.groupService.updateGroup(group).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getGroups();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }


  deleteGroup(group : Group)
  {
    this.groupService.deleteGroup(group).subscribe(response=>{
      this.matSnackBar.open(response.message,"",{duration:2000});
      this.getGroups();
    }, responseError=>{
      this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }


}
