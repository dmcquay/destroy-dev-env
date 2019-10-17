This is an example application that shows good practices for development environments.

## Initial Setup

- Install Docker
- Install Git
- Install Node (nvm recommended)
- Clone Repo
- `npm i`
- `npm everything`

## Things to see

- View the [main UI](http://localhost:3000/)
- [List TODOs from the API](http://localhost:3001/todos)

## How to connect to the dev database

- Set up your own tools using credentials found in docker-compose.yaml
- Connect on the command line with `npm run db`
- Execute a file on the command line with `cat $file | npm run run-sql`

## How to make changes to the database schema

Add a new sequentially named file to the initdb directory.
Either apply it manually with `cat initdb/03-* | npm run run-sql` or just run `npm run everything`.

This is a simplistic solution (but it works just fine to get you started). You may want to use
a migrations library (many ORMs provide these or there are standalone ones like liquibase).

## Things to take note of in how this development environment operates

1. Standard development config values are provied so you can start the app without customizing config. See config.js.
1. Infrastructure we depend on is provided with the project instead of requring you to install and configure it globally. We use Docker Compose to define this.
1. We not only provide an instance of Postgres, but also automatically apply the latest schema and insert seed data as necessary. We accomplish this through a nice feature of the Postgres docker images we're using which allows you to simply map a volume to a local dir that contains sql files and all those sql files will be executed when the Postgres instance is created. See the line that looks like `- "./initdb:/docker-entrypoint-initdb.d"` in docker-compose.yaml.
1. When recreating the environment, we destroy the database. This is important to ensure that all data in there is truly ephemeral. We don't want critical state getting inserted manually, making people afraid to truly recreate their environment. See the `recreate-infrastructure` script in the root package.json.
1. There is a single entrypoint to create the entire environment. In our case this is `npm run everything`.
1. Speed optimizations have been made in strategic places to ensure that the environment can be destroyed and recreated quickly. This is important because if doing so takes a long time, then people will avoid doing it and it will rot. For example, in the root package.json, we run several groups of tasks in parallel using `concurrently` which speeds the whole process up by a significant amount (maybe 50% is depending on your machine/network).
1. We mock third party APIs for a few reasons. First, this gives us full control so we can be sure our dev env works. Second, it allows us to run our dev env w/out sensitive secrets, allowing us to provide a complete set of config to make the dev env work. Third, it allows us to easily create scenarios we are interested in replicating for development purposes. See `mocks/server.js`.
1. We provide a start page that is not simply a page in our app. Instead, it is a development-specific page that pulls in and displays our readme and shows the status of all services in the dev env. The idea of this is that instead of forcing the developer to read docs first, we want to let them first just turn things on, second poke around (and we provide some links in the README to help them know what they might want to take a look at) and third continue reading the README when they're ready to go deeper. We host this in our mocks app. It is running at http://localhost:3002/start and it should auto-open when you run the app (via npm start or npm run everything).