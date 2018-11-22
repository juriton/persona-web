import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {Employee} from "./employee";
import {EmployeeFilter} from "./employee-filter";
import {Page} from "../page";
import {HttpClient} from "@angular/common/http";
import {throwError as observableThrowError} from "rxjs/internal/observable/throwError";
import {catchError, share, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {User} from "../user/user";

@Injectable()
export class EmployeeService {

  private employees: Array<Employee>;
  private employeesObservable: Observable<Array<Employee>>;

  private companyServiceUrl: string = 'api/company';
  private directorServiceUrl: string = '/directors';
  private managerServiceUrl: string = '/managers';
  private employeesServiceUrl: string = '/employees';

  constructor(private http: HttpClient) {
  }


  getEmployeesServiceUrl(directorId: number, managerId: number): string {
    return `${this.companyServiceUrl}${this.directorServiceUrl}/${directorId}${this.managerServiceUrl}/${managerId}`;
  }

  getAll(directorId: number, managerId: number): Observable<Array<Employee>> {
    const urlParamsString: string = `${this.getEmployeesServiceUrl(directorId, managerId)}${this.employeesServiceUrl}`;
    if (this.employees) {
      // if `data` is available just return it as `Observable`
      return of(this.employees);
    } else if (this.employeesObservable) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.employeesObservable;
    } else {
      this.employeesObservable =this.http.get<any>(urlParamsString).pipe(
        tap((response) => {
          // when the cached data is available we don't need the `Observable` reference anymore
          this.employeesObservable = null;

          this.employees = Object.assign([], response.content);

          return this.employees;
        }),
        catchError((error: any) => observableThrowError(error.error || 'Server error')),
        // make it shared so more than one subscriber can get the result
        share());
      return this.employeesObservable;
    }
  }

  getFilterQueryParams(filter: EmployeeFilter): string {
    let urlParamsString: string = `size=${filter.pageSize}&page=${filter.pageNumber - 1}`;
    urlParamsString += `${filter.sortOrder}`;
    return urlParamsString;
  }

  addEmployee(directorId: number, managerId: number, employee) {
    return this.http.post<Employee>(`${this.getEmployeesServiceUrl(directorId, managerId)}${this.employeesServiceUrl}/add`, employee);
  }

  removeEmployee(directorId: number, managerId: number, employeeId: number): Observable<any> {
    return this.http.delete(`${this.getEmployeesServiceUrl(directorId, managerId)}${this.employeesServiceUrl}/${employeeId}/remove`);
  }


   getEmployeeByUserId(userId: number, employees:  Array<Employee> ) {
    if (userId && employees) {
      return employees.filter(e => e.user.id === userId)[0];
    } else {
      return null;
    }
  }

}
