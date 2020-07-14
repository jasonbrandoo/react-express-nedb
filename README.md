[![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/)

## **React App with Express and NeDB**

Just simple React app with express as backend and NeDB as database.

## **How to use**

1. **Clone the project** `git clone https://github.com/jasonbrandoo/react-auth.git`
2. **Go to server folder** `cd react-auth/server`
3. **Install depedencies for express** `npm install`
4. **Go back to root folder** `cd ..`
5. **Install depedencies for react** `npm install`
6. **Run the server and client** `npm run server & npm start`

## **Script**

`npm run server`

Runs the express server

`npm start`

Runs the app on development mode

`npm run lint`

Runs eslint on src/ folder

## **Route**

**POST** `http://localhost:3001/api/v1/register` (Register)

**POST** `http://localhost:3001/api/v1/login` (Login)

**GET** `http://localhost:3001/api/v1/check` (Check token)

**GET** `http://localhost:3001/api/v1/register` (Logout)
