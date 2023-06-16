// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:5007/api',
  firebase: {
    apiKey: "AIzaSyDngeDCEHwdvnGHzXhRXnrJSsdBM1aTF74",
    authDomain: "hth0-5ee85.firebaseapp.com",
    projectId: "hth0-5ee85",
    storageBucket: "hth0-5ee85.appspot.com",
    messagingSenderId: "277358091476",
    appId: "1:277358091476:web:1b89dca131bc39860e2f41",
    measurementId: "G-NWX5H2QB3H"
  },
  recaptcha: {
    siteKey: '6LeBEU8dAAAAABzTdoFWNYhej5TS5ed5FRR4xnVg',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
