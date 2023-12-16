import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceService } from '../data-service.service';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatDialogModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  GetViewData:any;
  data:any;
  constructor(private data_service:DataServiceService){}
  ngOnInit(): void {
    this.Getapi_DAta();
    this.GetViewData=sessionStorage.getItem('ViewData')
  }
  Getapi_DAta()
  {
    this.data_service.GetDataAPI().subscribe(res=>{
       this.data=res;
       console.log(this.data,"USER DATA");
    })
  }
}
