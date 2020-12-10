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
  private popup = new Subject();
  $popup = this.popup.asObservable();

  constructor(private http: HttpClient,
    private dialog: MatDialog,
    private router: Router) {
  }




  postData(methodName, Input) {
    const url = this.serviceAddress + methodName;

    return this.http.post(url, Input)
      .pipe(catchError(this.handleError()));
  }
  patchData(methodName, Input) {
    const url = this.serviceAddress + methodName;

    return this.http.patch(url, Input)
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

      if (error.status === 400) {
        this.popup.next(error.error.message);
      }
      else if (error.status === 500) {
        this.popup.next(error.error.message);
        //this.openDialog("Unable to Process request!!");
      }
      else {
        this.popup.next(error.error.message);
      }
      return;
    };
  }


}
