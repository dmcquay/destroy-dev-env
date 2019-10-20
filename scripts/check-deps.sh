#!/bin/bash

bold=$(tput bold)
normal=$(tput sgr0)

command -v docker &> /dev/null
if [[ "$?" != "0" ]]
then
    echo "Missing dependency: Docker"
    echo "Recommended install method: brew update && brew install docker"
    exit 1
fi

command -v docker-compose &> /dev/null
if [[ "$?" != "0" ]]
then
    echo "Missing dependency: Docker Compose"
    echo "Recommended install method: This usually comes with Docker Engine, but on some systems "
    echo "you may want to install with pip. e.g. pip install docker-compose."
    exit 1
fi

command -v node &> /dev/null
if [[ "$?" != "0" ]]
then
    echo "Missing dependency: node"
    echo "Recommended install method: Follow instructions at https://github.com/nvm-sh/nvm"
    exit 1
fi

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