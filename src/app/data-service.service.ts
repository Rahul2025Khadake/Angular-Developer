import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService  {
 apiurl="http://localhost:3000/User";

   constructor(private _http:HttpClient) { }

  

  GetDataAPI()
  {
      return this._http.get(this.apiurl);
  }
  PostmethodData(user:any)
  {
    return this._http.post(this.apiurl,user);
  }

  deleteAPI(id:any,user:any)
  {
    return this._http.delete(`${this.apiurl}/${id}`,user)
  }

  UpdateAPI(id:any,user:any)
  {
    return this._http.put(`${this.apiurl}/${id}`,user);
  }
}
