import {EmployeeService} from "../../employee/employee.service";
import {Page} from "../../page";
import {Employee} from "../../employee/employee";
import {Component, Input, OnInit} from "@angular/core";
import {Observable, of} from "rxjs/index";
import {EmployeeFilter} from "../../employee/employee-filter";
import {Company} from "../company";
import {CompanyService} from "../company.service";
import {UsersService} from "../../user/user.service";
import {User} from "../../user/user";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EmployeeModalComponent} from "../../employee/employee-add/employee-add-modal.component";
import {Manager} from "../../manager/manager";

@Component({
  selector: 'app-company-details',
  templateUrl: 'company-details.component.html',
  styleUrls: ['company-details.component.css'],

})
export class CompanyDetailsComponent implements OnInit {
  manager: Manager;
  company: Company;
  searchValue: string;
  people$: Observable<Array<User>>;
  page: Page<Company>;
  filter: EmployeeFilter;


  constructor(private companyService: CompanyService,
              private userService: UsersService,
              private employeeService: EmployeeService,
              private modalService: NgbModal) {
  }

  ngOnInit(){
    this.loadData();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
        this.people$ = of(users);
      });
  }


  public loadData() {
    this.companyService.getAll(this.filter)
      .subscribe(page => {
        this.page = page;
      });

  }

  sortBy(field: string) {

    this.filter.pageNumber = 1;
    this.loadData();
  }


  public changePage(pageNo) {
    if (pageNo) {
      this.filter.pageNumber = pageNo;
      this.loadData();
    }
  }

  setUser(user) {
    this.searchValue = user.fullName;
  }

  addNewEmployee(director, manager) {
    const createEmployeeModalInstance = this.modalService.open(EmployeeModalComponent, {size: 'lg'});
    createEmployeeModalInstance.componentInstance.manager = manager;
    createEmployeeModalInstance.componentInstance.directorId = director.id;
    createEmployeeModalInstance.result.then((reload) => {
      if (reload) {
        this.loadData();
      }
    });
  }

  employeesChanged(employees) {
    this.loadData();
  }

}
