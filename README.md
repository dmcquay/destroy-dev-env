This is an example application that shows good practices for development environments.

# Getting Started

## Install Dependencies

- Install Git
- Install Node v10.x
- Install Docker
- Install Postgres

## Setup Database

- Apply `initdb/schema.sql` to your database

## Configure

- Copy `api/.env.example` to `api/.env`
- Edit your DB connection info in `api/.env`

## Start the Mocks

```
cd mocks
npm i
npm start
```

## Start the API

```
cd api
npm i
npm start
```

Check that the API is working by navigating to http://localhost:3001/todos. You should get a 200 JSON response with an empty array.

## Start the UI

```
cd ui
npm i
npm start
```

Navigate to http://localhost:3000/. You should get a 200, but basically a blank page since we have no todo's in our database yet.

Run `curl localhost:3001/create-random-todo` a couple times and you should see some todos show up.