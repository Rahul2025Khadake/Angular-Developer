import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,ReactiveFormsModule,FormsModule,Validator, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import {MatInputModule} from '@angular/material/input';

import {MatNativeDateModule} from '@angular/material/core';
@Component({
  selector: 'app-user',
  standalone: true,
  imports:
   [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,

  
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})


export class UserComponent implements OnInit {

  isedit:boolean=false;
 
  UserformDetails: FormGroup|any;
  data:any;
  constructor(private fb: FormBuilder, private data_service:DataServiceService,
    private dialog: MatDialog ) {}
 
    ngOnInit() {
      this.UserformDetails = new FormGroup({
        "name": new FormControl('', Validators.required),
        "Email": new FormControl('', Validators.required),
        "Phone": new FormControl('', Validators.required),
        "Website": new FormControl('', Validators.required),
        "dob": new FormControl('', Validators.required),
        "Developer": new FormControl( '',Validators.required),
      });
    
      this.Getapi_DAta();
    }
    ViewUserAllData:boolean=true;
    ViweDataBasedOnDivTag()
    {
      
          this.ViewUserAllData = !this.ViewUserAllData;
     

    }
    CloseTableviewdata()
    {
  
      this.ViewUserAllData=true;
    
     
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
     this.isDisabled = false
    
    
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
  
   isDisabled: boolean = true;
  EdtiUser(i:any,user:any)
  {   
    alert(this.isDisabled)
    this.isDisabled=true;
    
   
     this.isedit=true;
     this.UserformDetails.id=user.id;
     this.UserformDetails.setValue({
      name:user.name,
      Email:user.Email,
      Phone:user.Phone,
      Website:user.Website,
      dob:user.dob,
       Developer:user.Developer,
  
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
  viewMode: boolean = false;
  ViweData() {
    this.viewMode = true;
    this.openModal();
  }

  openModal() {
    const dialogRef = this.dialog.open(ViewComponent, {
      width: '1000px',
      height:'500px',
      data: {
        viewMode: this.viewMode,
      },
    });
    // Set here data in session storage 
    sessionStorage.setItem('ViewData','View')
    // Handle the dialog close event if needed
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
      console.log('Dialog closed with result:', result);
    });
  }
 
  
  
}


