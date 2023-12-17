import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
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

  // Downloaded in Excel Format

  exportToExcel(data: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    this.saveAsExcelFile(blob, fileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + '.xlsx';
    link.download = 'UserData_' + this.convertedDateFormat();
    link.click();
  }
  convertedDateFormat() {
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    d.length == 1 && (d = '0' + d);
    m.length == 1 && (m = '0' + m);
    return d + m + y;
  }
}
