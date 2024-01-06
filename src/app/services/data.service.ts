import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {DataModel} from "../models/data.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private currentData$= new BehaviorSubject<DataModel[]>([])
  currentData= this.currentData$.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  setCurrentData(value: DataModel[]) {
    this.currentData$.next(value);
  }
  getData(): Observable<DataModel[]> {
    return this.http.get<DataModel[]>(environment.baseUrl).pipe(
      catchError(this.handleError)
    );

  }

  deleteData(id: number): void {
    this.currentData$.next(this.currentData$.getValue().filter(item => item.id !== id))
  }
  updateData(data: DataModel): void {
    const index = this.currentData$.getValue().findIndex(item => item.id === data.id)
    const newData = this.currentData$.getValue()
    newData[index] = data
    this.currentData$.next(newData)
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: StatusCode: ${error.status}, Message: ${error.message}`;
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error(errorMessage));
  }
}
