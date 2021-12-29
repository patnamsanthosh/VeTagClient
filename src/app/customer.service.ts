import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Customer } from './model/customer.model';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  apiURL = 'https://localhost:44387';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getCustomer(id:string): Observable<Customer> {
    return this.http.get<Customer>(this.apiURL + '/api/customer/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  updateCustomer(customer:Customer) {
   return this.http.put(this.apiURL + '/api/customer/' + customer.customerId, customer, this.httpOptions).pipe(
    catchError(this.handleError));
  }

  saveCustomer(customer:Customer): Observable<Customer>{
    return this.http.post(this.apiURL + '/api/customer', customer, this.httpOptions).pipe(
     catchError(this.handleError));
   }

  handleError(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
