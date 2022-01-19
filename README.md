# TypeScript Node Express API

TypeScript Node Express API project starter with JWT authentication including:

- TypeScript
- NodeJS
- Express
- REACT
- OpenAPI documentation (powered by ReDoc)
- Logging (winston)
- ESLint (since TSLint is deprecated)

# Getting Started with Nodejs (Backend)

To build and run this app, you will need:

- NodeJS
- Knex compatible database (for this repo: Postgres)

## Available Scripts

In the project directory, you can run:

### `cd backend`

### Install dependencies

```bash
npm install
```

### Configure/run your database

1. You need to have a running database (compatible with Sequelize)
2. Update `.env.*` files with database information (and if needed, update `dialect` property in `src/config/sequelize.ts` file)
3. Create database(s) if needed

## Running the app

```bash
# build the app
npm run build

# run the app
npm start
```

# Getting Started with Create React App (Fronted)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `cd frontend`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

    ```
