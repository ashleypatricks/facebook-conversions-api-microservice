<h1 align="center">Basic Facebook Conversions API Microservice</h1>

## Description

This is a basic [Nest JS](https://github.com/nestjs/nest) Microservices project which integrates with the [Facebook Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api).

The app has the following features:

- User creation, storage and retrieval.
- Dispatch `PageView` tracking events to the Facebook Conversions API with the relevant user information.

## Use Case

This project is typically best suited as a 3rd-party API tool / microservice which will receive data about an already logged-in user to your website, and send that information to Facebook as a result of visiting a targeted page on your website.

## Future Improvements

This is a basic Conversions API implementation. For version 2, I would add the following features to this project for improvements:

- Logging
- Testing
- Unified response mechanism
- Fine grained error handling and response production
- Dockerized - to enable smoother developer experience and CI / CD pipeline integration
- Docker-compose to launch a stand alone Postgresql Server alongside the Prisma configuration rather than a file-based SQlite database.
- More tracking events

## Technology

- Prisma
- TypeScript
- Nest.js

## Project setup

### Install dependencies

`$ npm install`

## Add environment configuration file

The app requires a `.env` file placed in the root with the following information:

- `FB_ACCESS_TOKEN` (available from Facebook business manager)
- `FB_PIXEL_ID` (available from Facebook business manager)
- `FB_CONVERSION_API_BASE_URL` (suggested value: `https://graph.facebook.com/v21.0` but consult the documentation for any updates to the version and shape.)
- `DATABASE_URL` (suggested value: `file:./conversionapi/db` due to the file based Sqlite configuration.)

## (Optional) Prisma Schema Migration

The initial database migrations are already run for Prisma, and the the Prisma client is already synchronised to this migration in this repo. If you make changes to the schema, or face any errors upon start up, then you can run the following to update the schema and client:

`npx prisma migrate dev --name init`

## Compile and run the project

### development

`$ npm run start`

### watch mode

`$ npm run start:dev`

### production mode

`$ npm run start:prod`

## Available Requests

#### Retrieve a User by `id`

The `id` is an auto incremented number e.g. `5`:

- `GET: localhost:3000/user/:{id}`

#### Create a User

- `POST: localhost:3000/user`

body:

```
{
    "email": "example@example.com",
    "fbLoginId": 12345,
    "firstName": "some first name",
    "lastName": "some last name",
    "gender": "Male",
    "dob": "10-04-1982"
}
```

#### Send send page tracking information to Facebook

- `POST: localhost:3000/track`

body:

```
{
    "userId": 1,
    "eventName": "PageView",
    "actionSource": "website",
    "eventSourceUrl": "www.test-url.com",
    "clientIpAddress": "232.166.220.150",
    "clientUserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0"
}
```
