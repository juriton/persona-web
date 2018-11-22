import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Page} from "../../page";
import {Employee} from "../employee";
import {EmployeeFilter} from "../employee-filter";
import {Manager} from "../../manager/manager";
import {EmployeeService} from "../employee.service";
import {Director} from "../../director/director";
import {RkasToastrService} from "../../util/toastr/toastr.service";
import {CompanyService} from "../../company/company.service";
import {Company} from "../../company/company";
import {Router} from "@angular/router";





@Component({
  selector: 'app-employees-list',
  templateUrl: 'employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  @Input() manager: Manager;
  @Input() director: Director;
  @Input() searchValue: string;
  @Output() employeesChanged = new EventEmitter();
  page: Page<Company>;
  filter: EmployeeFilter;


  constructor(private employeeService: EmployeeService,
              private toastr: RkasToastrService,
              private router: Router,
              private companyService: CompanyService) {
  }

  ngOnInit(){}

  public loadData() {
    this.companyService.getAll(this.filter)
      .subscribe(page => {
        this.page = page;
      });

  }


  removeEmployee(employee) {
    this.employeeService.removeEmployee(this.director.id, this.manager.id, employee.id).subscribe(response => {
      this.toastr.success('Succes!');
      this.employeesChanged.emit(response);
    });
  }
}
