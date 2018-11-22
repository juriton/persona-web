import {throwError as observableThrowError} from 'rxjs/internal/observable/throwError';
import {Injectable} from "@angular/core";
import {User} from "./user";
import {of} from 'rxjs/observable/of';
import {HttpClient} from "@angular/common/http";
import {share, catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersService {


  private usersServiceURL: string = `/api/users`;

  private users: Array<User>;

  private usersObservable: Observable<Array<User>>;

  constructor(private http: HttpClient) {
    this.getUsers().subscribe();
  }

  getUsers(): Observable<Array<User>> {
    if (this.users) {
      // if `data` is available just return it as `Observable`
      return of(this.users);
    } else if (this.usersObservable) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.usersObservable;
    } else {
      this.usersObservable = this.http.get<any>(
        `${this.usersServiceURL}?size=1000&page=0&sort=firstName,asc&sort=lastName,asc`).pipe(
        tap((response) => {
          // when the cached data is available we don't need the `Observable` reference anymore
          this.usersObservable = null;

          this.users = Object.assign([], response.content);

          return this.users;
        }),
        catchError((error: any) => observableThrowError(error.error || 'Server error')),
        // make it shared so more than one subscriber can get the result
        share());
      return this.usersObservable;
    }
  }

  getUserById(id: number): User {
    if (id && this.users) {
      return this.users.filter(u => u.id === id)[0];
    } else {
      return null;
    }
  }

}
