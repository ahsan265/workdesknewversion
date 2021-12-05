// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:'https://api.gigaaa.link/api/v1',
  backendApi: 'https://gigaaa-backend.azurewebsites.net',
  login:'https://api.gigaaa.link/oauth/token',
  client_id: 8,
  oauth_url: 'https://accounts.gigaaa.com/oauth',
  accounts_url: 'https://accounts.gigaaa.com/oauth',
  redirect_uri: 'http://localhost:4202/callback',
  uri: 'http://localhost:4202'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// `https://accounts.gigaaa.com/authorize?response_type=code&client_id=6&code_challenge=dC08eZrfXXZDT-ANDggZ0c0O83oVsrls_VjhbVWyq-0&state=c4HbZPyAgIL.H1mi3h9r2dfpi6bmM4&code_challenge_method=S256&redirect_uri=https:%2F%2Fanalytics.gigaaa.com%2Fcallback`

// `https://accounts.gigaaa.com/oauth/authorize?response_type=code&client_id=4&code_challenge=-6azNSab4ZALIh-calGJX_VvbS4E5WbzijTWd66NCyI&state=G~a.wRL7svc-nCVovcxuaMKI4MLU1n&code_challenge_method=S256&redirect_uri=http%3A%2F%2Flocalhost%3A4202%2Fcallback&action=undefined`
