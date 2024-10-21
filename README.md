# IpConfigureChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.4.

## Pre-requisites

1. Create an `environment.ts` inside the `/src` folder with a valid username and password:

```javascript
export const credentials = {
  username: "USERNAME",
  password: "PASSWORD",
};
```

2. (optional) install Docker.

## Run the app

**Option 1 - Docker:**

From the root directory run:

```shell
docker build -t app .
docker run --rm -p 4200:4200 app
```

**Option 2 - Local:**

From the root directory run the following:

```shell
npm install
npm run start
```

Once the app is started via either option, you can navigate to http://localhost:4200 to view it.

Hit "login" in the upper right hand corner and start a new session, you will be logged in with the credentials you defined
in environment.ts and will be able to view the streams.
