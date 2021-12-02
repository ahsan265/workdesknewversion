import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { addsubscriptiondata, subsdata, User } from '../model/User';
import { GigaaaApiService } from './gigaaaapi.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { gigaaasocketapi } from './gigaaasocketapi.service';
import { MessageService } from './messege.service';
import { UserloginserviceService } from './userloginservice.service';
@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate {

  public user: BehaviorSubject<User>;

  constructor(private route: Router,
    private router: ActivatedRoute,private useraccountservice:UserloginserviceService,private message:MessageService,private gigaaaApiService: GigaaaApiService) {

      this.user = new BehaviorSubject(this.getLoggedUser());
  }

  public async login(email: string, password: string): Promise<void> {
    this.logOff();
    var user
    try {  user = await this.gigaaaApiService.loginUser({ email: email, password: password });
    const subtoken =await this.gigaaaApiService.getsubstoken({username: email, password: password,grant_type: "password", client_id: 2, client_secret: "rSuXIj9uj9KDkvI4oDjvkqdHfYLar4nMukGjUn1Z"});
    const data={ token_type: subtoken.token_type,
      expires_in: subtoken.expires_in,
      access_token:subtoken.access_token,
      refresh_token :subtoken.refresh_token};

    localStorage.setItem('gigaaa-subscription', JSON.stringify(data))
    const token = JSON.parse(localStorage.getItem('gigaaa-subscription'))

    var code = this.router.snapshot.queryParamMap.get('invitation_code');
    if(code!=null)
    {
      var code_invite={"invitation_code": code}

      await this.gigaaaApiService.sendinvitationcode(token.access_token,code_invite);
    }
    const subsiddata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
    const subsid=await this.gigaaaApiService.getsubsid(subsiddata.access_token);

    //console.log(subtoken);
    user.email = email;
    console.log(token);

    localStorage.setItem('gigaaa-user', JSON.stringify(user));



    console.log(subsid)
    subsiddata['subscription_id']={subsid}
    localStorage.setItem('gigaaa-subscription', JSON.stringify(subsiddata))
    this.user.next(user);

     this.message.setSuccessMessage("Logged In Successfully")

    this.useraccountservice.getopendashboard(1);

    return user;
}
catch(err){
  console.log(err)
  // this.logOff();
  // this.route.navigateByUrl('home');
  this.handleLoginRegisterError(err);
}


  }

  private handleLoginRegisterError(response: any) {
    for (const key in response.error.errors) {
      if (response.error.errors.hasOwnProperty(key)) {
        this.message.setErrorMessage(response.error.errors[key][0], 'toast-bottom-right');
      }
    }
  }
  public logOff() {
    this.user.next(null);
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('gigaaa-user') || !!this.user.value;
  }

  public getLoggedUser(): User {
    return JSON.parse(localStorage.getItem('gigaaa-user'));
  }


  public updateUser(user: User) {
  //  localStorage.removeItem('gigaaa-user');
    localStorage.setItem('gigaaa-user', JSON.stringify(user));
  }


  canActivate() {
    return this.isLoggedIn();
  }
}
