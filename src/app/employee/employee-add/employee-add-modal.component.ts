import {Component, OnInit} from "@angular/core";
import {Observable, of} from "rxjs/index";
import {UsersService} from "../../user/user.service";
import {CompanyService} from "../../company/company.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../user/user";
import {EmployeeService} from "../employee.service";
import {Employee} from "../employee";
import {ManagersService} from "../../manager/manager.service";
import {Manager} from "../../manager/manager";
import {ToastrService} from "ngx-toastr";
import {AppTranslateLoader} from "../../util/translate/translate-loader";
import {RkasToastrService} from "../../util/toastr/toastr.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-employee-add-modal',
  templateUrl: 'employee-add-modal.component.html'
})
export class EmployeeModalComponent implements OnInit {
  manager: Manager;
  directorId: number;
  people$: Observable<Array<User>>;
  employees$: Observable<Array<User>>;
  newEmployee: User;
  existsEmployee: User;
  existsEmployees: Array<User>;
  private employees = new Array<User>();

  constructor(private companyService: CompanyService,
              private usersService: UsersService,
              private managersService: ManagersService,
              private toastr: RkasToastrService,
              private translate: TranslateService,
              private ngbActiveModal: NgbActiveModal,
              private employeesService: EmployeeService) {
  }

  ngOnInit() {
    this.loadUsers();
    this.loadEmployeesRelatedManager();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe(users => {
       this.people$ = of(users);
    });
  }

  loadEmployeesRelatedManager() {
    this.manager.employees.forEach(employee => {
      this.employees.push(employee.user)
    });
    this.employees$ = of(this.employees);
  }

  addNewEmployee() {
    let instance = this;
    let employee = new Employee();
    employee.user = this.usersService.getUserById(this.newEmployee.id);
    if ( this.existsEmployee != undefined ) {
      employee.orderNr = this.employeesService.getEmployeeByUserId(this.existsEmployee.id, this.manager.employees).orderNr;
    } else {
      employee.orderNr = 1;
    }

    this.employeesService.addEmployee(this.directorId, this.manager.id, employee).subscribe(result =>{
      instance.closeModal(true);
      instance.toastr.success('Succes!');
    },
      error => {
        if (error != null) {
          instance.closeModal(false);
          let toastMessage = error.error.message;
          instance.toastr.error(toastMessage);
        }
      });
  }

  closeModal(result: boolean) {
    this.ngbActiveModal.close(result);
  }
  cancel() {
    this.closeModal(false);
  }
}
