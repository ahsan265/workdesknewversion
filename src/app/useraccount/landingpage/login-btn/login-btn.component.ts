import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.scss']
})
export class LoginBtnComponent implements OnInit {
  query = "";
  clientId = environment.client_id;
  code = "";
  challenge!: { code: string, verify: string, state: string };
  token!: string | null;
  state!: string;
  redirectUri = environment.redirect_uri;
  oauthUrl = environment.oauth_url;
  action: string = 'add';

  constructor(
    private cookies: CookieService
    ) {
  }

  ngOnInit() {}

  login() {
    this.generateChallenge();
  }

  generateChallenge(action?: string) {
    let verify = this.generateCodeVerifier();
    let code = this.generateCodeChallenge(verify)
    let state = this.generateRandomString(30)
    this.code = code;
    this.challenge = {
      code, verify, state
    }
    localStorage.setItem('ch', JSON.stringify(this.challenge));
    this.query = `response_type=code&client_id=${this.clientId}&code_challenge=${this.challenge.code}&state=${this.challenge.state}&code_challenge_method=S256&redirect_uri=${encodeURIComponent(this.redirectUri)}&action=${action}`;
    let url = `${this.oauthUrl}/authorize?` + this.query;
    location.href = url;
  }

  generateCodeVerifier() {
    return this.generateRandomString(128)
  }

  generateRandomString(length: number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  generateCodeChallenge(code_verifier: string) {
    return this.base64URL(code_verifier);
  }

  base64URL(string: string) {
    let b64 = CryptoJS.SHA256(string).toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    return b64;
  }

  logout() {
    this.cookies.delete('access_token_active');
    this.cookies.delete('gigaaa_user');
  }
}
