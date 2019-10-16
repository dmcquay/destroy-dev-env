This is an example application that shows good practices for development environments.

# Initial Setup

- Install Docker
- Install Git
- Install Node (nvm recommended)
- Clone Repo
- `npm i`
- `npm everything`

# Things to see

- View the [main UI](http://localhost:3000/)
- [List TODOs from the API](http://localhost:3001/todos)

# How to make changes to the database schema

...

# Install on Alpine Linux

- Install Docker and Docker Compose: https://wiki.alpinelinux.org/wiki/Docker
- Install Git: `apk add git`

Example:

Uncomment community repo in /etc/apk/repositories.
```
apk update
apk add docker git pip python-dev libffi-dev openssl-dev gcc libc-dev make
pip install docker-compose
```