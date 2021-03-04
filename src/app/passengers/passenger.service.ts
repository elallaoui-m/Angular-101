import { Observable, of } from "rxjs";
import { Passenger } from "src/assets/passengers";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class PassengerService {
  private passengersUrl = "http://localhost:3000/passengers";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  constructor(private http: HttpClient) {}

  public getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.passengersUrl).pipe(
      tap((_) => console.log("fetched passengers")),
      catchError(this.handleError<Passenger[]>("getPassengers", []))
    );
  }

  private handleError = <T>(operation = "operation", result?: T) => {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  };
}
