import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Page} from "../page";
import {Employee} from "../employee/employee";
import {Observable} from "rxjs/index";
import {EmployeeFilter} from "../employee/employee-filter";
import {Company} from "./company";
import {UsersService} from "../user/user.service";

@Injectable()
export class CompanyService {

  private companyPageURL: string = `/company`;
  private companyServiceUrl: string = 'api/company';

  constructor(private http: HttpClient) {

  }

  getAll(filter: EmployeeFilter): Observable<Page<Company>> {
    return this.http.get<Page<Company>>(`${this.companyServiceUrl}/structure`);
  }

}
