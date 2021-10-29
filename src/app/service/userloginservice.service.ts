import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserloginserviceService {
  dashobs$: Observable<any>;
  
    private opendashsubject = new Subject<any>();
  

    constructor() {
        this.dashobs$ = this.opendashsubject.asObservable().pipe();
    }

    getopendashboard(val:any) {
        this.opendashsubject.next(val);
 }
}
