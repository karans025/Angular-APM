import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ProductService {

    productUrl: string = "api/products/products.json";
    constructor(private http: HttpClient) {

    }
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    } 

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';  
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.error}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}