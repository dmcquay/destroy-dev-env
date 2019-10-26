#!/bin/bash

# If .env does not exist, auto-create it.
if [ ! -f api/.env ]
then
    ln -s .env.standard-dev api/.env
fi

# If .env does exist, but differs from standard, warn user.
diff api/.env.standard-dev api/.env
if [[ "$?" != "0" ]]
then
    echo "api/.env does not match api/.env-standard-dev (see diff above)"
    echo "It is recommended to keep these in sync via a symlink."
    echo "You can create one with this command: ln -s .env.standard-dev api/.env"
    echo "Press enter to continue or Ctrl-c to stop and fix."
    read
fi
