import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class CompanyToastrService {

  constructor(public toastr: ToastrService) {
  }

  success(message: string) {
    const type: string = 'success';
    this.toast(message, type, {'timeOut': '5000'});
  }

  error(message: string) {
    const type: string = 'error';
    this.toast(message, type, {'disableTimeOut': 'true'});
  }

  info(message: string) {
    const type: string = 'info';
    this.toast(message, type, {'timeOut': '5000'});
  }
  clearAll() {
    this.toastr.clear();
  }

  private toast(content: string, type: string, options?: any) {

    options.titleClass = type;
    options.positionClass = 'toast-top-full-width';
    options.enableHtml = true;
    options.closeButton = true;

    this.toastr.show(content, null, options, type);
  }
}
