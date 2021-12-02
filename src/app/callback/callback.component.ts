import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../service/auth.service';
import { GigaaaApiService } from '../service/gigaaaapi.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  redirectUri = environment.redirect_uri;
  clientId = environment.client_id;
  oauthUrl = environment.oauth_url;
  constructor(
      private activated: ActivatedRoute,
      private http: HttpClient,
      private cookie: CookieService,
      private router: Router,
      private apiService: GigaaaApiService,
      private authService: AuthService
    )   { }

  ngOnInit(): void {
    let ch = localStorage.getItem('ch');
    if (ch != null){
      let challenge = JSON.parse(ch)
      this.activated.queryParams.pipe(
        switchMap(({code}) => {
          const formData = new FormData();
          formData.append("code", code);
          formData.append("grant_type", "authorization_code");
          formData.append("redirect_uri", this.redirectUri);
          formData.append("state", challenge.state);
          formData.append("client_id", this.clientId.toString());
          formData.append("code_verifier", challenge.verify);

          return this.http.post(`${this.oauthUrl}/token`, formData)})
      ).subscribe(
        (res: any) => {
          this.authService.token = res;
          this.apiService.getCurrentUser().subscribe((r) => {
            this.authService.user.next(r);
            this.cookie.set("gigaaa_user", JSON.stringify(r));
            this.cookie.set("access_token_active", JSON.stringify(res));
            this.router.navigate(["/"]);
          });
        },
        err => console.log(err)
      )
    }
  }
}
