import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,ReactiveFormsModule,FormsModule,Validator, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user',
  standalone: true,
  imports:
   [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})


export class UserComponent implements OnInit {

  isedit:boolean=false;
  // isHeadingaction:boolean=true;
  UserformDetails: FormGroup|any;
  data:any;
  constructor(private fb: FormBuilder, private data_service:DataServiceService,
    ) {}
 
    ngOnInit() {
      this.UserformDetails = new FormGroup({
        "name": new FormControl('', Validators.required),
        "Email": new FormControl('', Validators.required),
        "Phone": new FormControl('', Validators.required),
        "Website": new FormControl('', Validators.required)
      });
    
      this.Getapi_DAta();
    }

Submit()
{

}
  Getapi_DAta()
  {
    this.data_service.GetDataAPI().subscribe(res=>{
       this.data=res;
       console.log(this.data,"USER DATA");

    })
  }

  AddModel()
  {
     this.isedit=false;
     this.UserformDetails.reset();
    
  }
  UpdateUser(user:any)
  {
   this.UserformDetails.id=user.id;
   this.data_service.UpdateAPI(this.UserformDetails.id,this.UserformDetails.value).subscribe(res=>{
    this.Getapi_DAta();
    Swal.fire({
      icon: "success",
      title: "User Data Succfully Updated",
      text: "Thank You!",
      timer:4000,
    });
   })
   
  }
  username:any;
  Senddata(UserformDetails:FormGroup)
  {
     this.data.push(this.UserformDetails.value)
     this.username=this.UserformDetails.value.name;
     this.data_service.PostmethodData(this.UserformDetails.value).subscribe(res=>{
      this.Getapi_DAta();
      Swal.fire({
        title: "User Data Succfully Added",
         text: "Thank You!",
        icon: "success",
        timer: 4000
      });
     })
  }
  EdtiUser(i:any,user:any)
  {
     this.isedit=true;
     this.UserformDetails.id=user.id;
     this.UserformDetails.setValue({
      name:user.name,
      Email:user.Email,
      Phone:user.Phone,
      Website:user.Website
     });
  }
  DeleteUser(index:number,user:any)
  {
     this.UserformDetails.id=user.id;
     this.data_service.deleteAPI(this.UserformDetails.id,user).subscribe(res=>{
      this.data.splice(index,1);
      Swal.fire({
        icon: "success",
        title: "User Data Succfully Deleted",
        text: "Thank You!",
        timer:4000,
      });
     })
  }
}


