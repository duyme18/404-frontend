// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  bookingUrl: 'http://localhost:8080/api/auth/booking',
  userUrl: 'http://localhost:8080/api/auth/user/',
  categoryRoomUrl: 'http://localhost:8080/api/auth/category-room/',
  categoryHomeUrl: 'http://localhost:8080/api/auth/category-home/',
  statusHomeUrl: 'http://localhost:8080/api/auth/status-home/',
  searchAllUrl: 'http://localhost:8080/api/auth/home/searchAll/',
  imageHomeUrl: 'http://localhost:8080/api/auth/imageHome',
  homeUrl: 'http://localhost:8080/api/auth',
  commentUrl: 'http://localhost:8080/api/auth/comment/',
  firebase: {
    apiKey: 'AIzaSyD3Gv2FfLLjeQ3dIAdKDOXgBGduXgPvSPk',
    authDomain: 'angular-firebase-c1517.firebaseapp.com',
    databaseURL: 'https://angular-firebase-c1517.firebaseio.com',
    projectId: 'angular-firebase-c1517',
    storageBucket: 'angular-firebase-c1517.appspot.com',
    messagingSenderId: '631043484969',
    appId: '1:631043484969:web:e8287b8a8a9d5d72e59b38',
    measurementId: 'G-RS4FCZJ9HY'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
