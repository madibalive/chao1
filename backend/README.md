# TypeScript Node Express API
TypeScript Node Express API project starter with JWT authentication including:
- TypeScript
- NodeJS
- Express
- JWT authentication (with passport)
- Sequelize (with type-checking)
- OpenAPI documentation (powered by ReDoc)
- Tests + code coverage (chai, mocha, istanbul, supertest, ...)
- Logging (winston)
- ESLint (since TSLint is deprecated)

## Prerequisites
To build and run this app, you will need:
- NodeJS
- Sequelize compatible database (for this repo: Postgres)

## Getting started
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
### Playing with endpoints (and authentication)
#### Create user and retrieve JWT token
1. You need to create a user: call `POST /signup` with the following body:
    ```json
    {
      "email": "mail@mail.com",
      "password": "moreThan8CharactersPassword"
    }
    ```
2. Retrieve the JWT token: call `POST /login` with the same previous body and retrieve the JWT token in body response (`token` field).
3. For secured endpoints, you must set the JWT token as Bearer token
#### Call endpoints
- `GET /users`: returns list of all database user names (authentication is not required)
- `GET /me`: returns information about the authenticated user (authentication is required)

## Other commands
- Run tests
    ```bash
    npm run test
    ```
    For code coverage, open `coverage/index.html` file
- Run linter
    ```bash
    npm run lint
    ```
