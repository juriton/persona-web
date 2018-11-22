import {Injectable} from "@angular/core";
import {throwError as observableThrowError} from "rxjs/internal/observable/throwError";
import {catchError, share, tap} from "rxjs/operators";
import {Observable} from 'rxjs/Observable';
import {Manager} from "./manager";
import {HttpClient} from "@angular/common/http";
import {of} from 'rxjs/observable/of';
import {User} from "../user/user";
import {map} from "rxjs/internal/operators";

@Injectable()
export class ManagersService {

  private managers: Manager;
  private managersObservable: Observable<Manager>;

  private companyServiceUrl: string = 'api/company';
  private directorServiceUrl: string = '/directors';
  private managerServiceUrl: string = '/managers';

  constructor(private http: HttpClient) {

  }

  getManagersServiceUrl(directorId: number): string {
    return `${this.companyServiceUrl}${this.directorServiceUrl}/${directorId}${this.managerServiceUrl}`;
  }

  getManagerById(directorId: number, managerId: number): Observable<Manager> {
    if (this.managers) {
      // if `data` is available just return it as `Observable`
      return of(this.managers);
    } else if (this.managersObservable) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.managersObservable;
    } else {
      this.managersObservable = this.http.get<any>(
        `${this.getManagersServiceUrl(directorId)}/${managerId}?size=1000&page=0&sort=firstName,asc&sort=lastName,asc`).pipe(
        tap((response) => {
          // when the cached data is available we don't need the `Observable` reference anymore
          this.managersObservable = null;

          this.managers = Object.assign([], response);

          return this.managers;
        }),
        catchError((error: any) => observableThrowError(error.error || 'Server error')),
        // make it shared so more than one subscriber can get the result
        share());
      return this.managersObservable;
    }
  }
}
