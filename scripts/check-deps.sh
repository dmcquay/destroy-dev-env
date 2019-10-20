#!/bin/bash

bold=$(tput bold)
normal=$(tput sgr0)

# Check that docker is installed
command -v docker &> /dev/null
if [[ "$?" != "0" ]]
then
    echo "Missing dependency: Docker"
    echo "Recommended install method: brew update && brew install docker"
    exit 1
fi

# Check that docker-compose is installed
command -v docker-compose &> /dev/null
if [[ "$?" != "0" ]]
then
    echo "Missing dependency: Docker Compose"
    echo "Recommended install method: This usually comes with Docker Engine, but on some systems "
    echo "you may want to install with pip. e.g. pip install docker-compose."
    exit 1
fi

# Check that node is installed
command -v node &> /dev/null
if [[ "$?" != "0" ]]
then
    echo "Missing dependency: node"
    echo "Recommended install method: Follow instructions at https://github.com/nvm-sh/nvm"
    exit 1
fi

# Check for correct version of node
expected_node_version=`cat .nvmrc`
actual_node_version=`node --version`
echo "$actual_node_version" | grep -e "^v${expected_node_version}" &> /dev/null
if [[ "$?" != "0" ]]
then
    echo "It appears you are using the wrong version of node."
    echo "Your version: ${actual_node_version}"
    echo "Expected version: ${expected_node_version}"
    echo "Recommended resolution: Run ${bold}nvm install${normal} in the root of the project"
    exit 1
fi

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