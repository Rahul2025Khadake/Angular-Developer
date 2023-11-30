import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from "./user/user.component";
import {ReactiveFormsModule,FormGroup,FormsModule,FormBuilder} from "@angular/forms"
import {  HttpClientModule } from '@angular/common/http';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      CommonModule, 
      RouterOutlet, 
      UserComponent,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
      
    ]
})

export class AppComponent {
  title = 'Angular';
}
