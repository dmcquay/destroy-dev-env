This is an example application that shows good practices for development environments.

## Initial Setup

- Install Docker
- Install Git
- Install Node v10.x
- Install Postgres
- `cd api && npm i`
- `cd ui && npm i`
- `cd mocks && npm i`
- Create a database in Postgres
- Copy `api/.env.example` to `api/.env` and modify postgres values
- Apply all the scripts in `initdb` to your database
- Run the mocks: `cd mocks && npm start`
- Run the api: `cd api && npm start`
- Check that the API is working by navigating to http://localhost:3001/todos. You should get a 200 JSON response with an empty array.
- Run `curl localhost:3001/create-random-todo` a couple times and you should see some todos show up.
- Run the UI: `cd ui && npm start`
- Navigate to http://localhost:3000/ and you should see some todos.
