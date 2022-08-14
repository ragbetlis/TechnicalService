import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {


  statuses:Status[]=[];
  status?:Status;
  constructor(private statusService:StatusService) { }

  ngOnInit(): void {
    this.getStatuss();
  }

  getStatuss(){
    this.statusService.getStatuses().subscribe(response=>{
      this.statuses = response.data
   
    })
  }

  getStatusById(status:number){
    this.statusService.getStatusById(status).subscribe(response=>{
      this.status=response
    },responseError=>{
      console.log(responseError.error.error)
    })
  }

  addStatus(status : Status)
  {
    this.statusService.addStatus(status).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getStatuss();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }

  updateStatus(status : Status)
  {
    this.statusService.updateStatus(status).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getStatuss();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }


  deleteStatus(status : Status)
  {
    this.statusService.deleteStatus(status).subscribe(response=>{
      //this.matSnackBar.open(response.message,"",{duration:2000});
      this.getStatuss();
    }, responseError=>{
     // this.matSnackBar.open(responseError.error.error,"",{duration:2000});
    })
  }


}
