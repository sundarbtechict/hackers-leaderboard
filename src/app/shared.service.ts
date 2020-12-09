import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { MatDialog } from '@angular/material/dialog';

import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  serviceAddress = environment.serviceURL;
  constructor(private http: HttpClient,
    private dialog: MatDialog,
    private router: Router) {
  }


  postData(methodName, Input) {
    const url = this.serviceAddress + methodName;

    return this.http.post(url, Input)
      .pipe(catchError(this.handleError()));
  }
  getData(methodName) {
    const url = this.serviceAddress + methodName;


    return this.http.get(url)
      .pipe(catchError(this.handleError()));
  }



  private handleError<T>() {
    return (error: any): Observable<T> => {
      //  alert(error.statusText);

      if (error.status === 401) {
        // this.spinnerStatus.next(false)
        //this.openDialog("Your Session Expired");
      }
      else if (error.status === 500) {
        //this.spinnerStatus.next(false)
        //this.openDialog("Unable to Process request!!");
      }
      else if (error.status === 204) {
        //this.spinnerStatus.next(false)
        //this.openDialog("No Data Found!!");
      }
      else {
        //is.spinnerStatus.next(false)
        //this.text = error.error.text;
        //this.openDialog(this.text);
      }
      return;
    };
  }


}
