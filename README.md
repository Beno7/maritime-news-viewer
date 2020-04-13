# Maritime News Viewer

This application is a Maritime News Viewer powered by https://newsapi.org/. It is primarily made with Angular 6 and Nodejs. It makes use of Bootstrap and Angular Material UI Frameworks.

## Running the App

A prerequisite is to run `npm i` to install all the required npm packages.

The client app is already built and is set to `http://localhost:3000`. If the said port is available in the machine where this App will reside in, start up the server via `npm start` or `node ./server`. Once the server has started, access the web page via heading to `http://localhost:3000` in a browser.

To change the https://newsapi.org/ API Key, head over to `server/configs/constants.js` and change `newsRepository.apiKey`.

If the default port is not available in the machine where this app will reside in, change the port either by setting `process.env.PORT` or the default value itself in `server/index.js`. However, it is noteworthy that changing the server's runtime port will render the client app disconnected. Thus, go to `client/environments/environment.ts` or `client/environments/environment.prod.ts` and change `apiUrl` to the new server directory. Once done, either serve the Angular App via `ng serve` or build it with `ng build` or `ng build --prod`, depending on the environment aimed for.

## Improvements

The code focuses mainly on the Core Functionalities of an RSS Feed. As such, the following are available for improvements:
1. User Interface and User Experience
  - Design
    - The UI has been implemented via Bootstrap defaults. As such, there is a large room for improvement in terms of design.
  - Mobile
    - Although the UI adapts with viewport changes, it is currently not optimized for Mobile Viewports.
2. Backend Authorization
  - The backend currently has no Access Token required to access its APIs. A simple express middleware, and JWT or the https://newsapi.org/ API Key itself would suffice.
3. Backend Data Persistence
  - There are currently no implemented Backend Data Persistence. As such, it is recommended to make
  use of redis.
4. Client Side Caching
  - There are currently no implemented Caching at the Client Side.
