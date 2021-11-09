import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastrService: ToastrService) { }

  public setSuccessMessage(message: string, position?: string): void {
    this.toastrService.success(message, '', {
      timeOut: 20000,
      positionClass: position ? position : 'toast-bottom-right'
    });
  }

  public setInformationMessage(message: string, position?: string): void {
    this.toastrService.info(message, '', {
      timeOut: 3000,
      positionClass: position ? position : 'toast-bottom-right'
    });
  }

  public setErrorMessage(message: string, position?: string): void {
    this.toastrService.warning(message, '', {
      timeOut: 3000,
      positionClass: position ? position : 'toast-bottom-right'
    });
  }
}
