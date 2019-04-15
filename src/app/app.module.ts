import {BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NgSelectModule} from '@ng-select/ng-select';
import {AppComponent } from './app.component';
import {EmployeeListComponent} from "./employee/employee-list/employee-list.component";
import {EmployeeService} from "./employee/employee.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HighlightSearchPipe} from "./util/highlight-search.pipe";
import {FormsModule} from "@angular/forms";
import {NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CompanyDetailsComponent} from "./company/company-details/company-details.component";
import {CompanyService} from "./company/company.service";
import {UsersService} from "./user/user.service";
import {EmployeeModalComponent} from "./employee/employee-add/employee-add-modal.component";
import {ManagersService} from "./manager/manager.service";
import {CompanyToastrService} from "./util/toastr/company-toastr.service";
import {AppTranslateLoader} from "./util/translate/translate-loader";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {ToasterModule, ToasterService} from 'angular5-toaster';
import {CompanyToastComponent} from "./util/toastr/company-toast.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OrderByPipe} from "./util/order-by.pipe";
import {SvgIconLoader} from "./util/icon/svg-icon.loader";
import {SvgIconComponent} from "./util/icon/svg-icon.component";

const routes: Routes = [
  {path: '', redirectTo: '/company', pathMatch: 'full'},
  {path: 'company', component: CompanyDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CompanyDetailsComponent,
    EmployeeModalComponent,
    SvgIconComponent,
    HighlightSearchPipe,
    OrderByPipe,
    CompanyToastComponent
  ],
  entryComponents: [
    EmployeeModalComponent,
    CompanyToastComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ToastrModule.forRoot({
      toastComponent: CompanyToastComponent
    }),
    FormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgbModule,
    NgSelectModule,
  ],
  providers: [
    EmployeeService,
    CompanyService,
    UsersService,
    CompanyToastrService,
    SvgIconLoader,
    ManagersService,
    ToastrService
  ],
  exports: [
    OrderByPipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}

export function createTranslateLoader(http: HttpClient) {
  return new AppTranslateLoader(http);
}
