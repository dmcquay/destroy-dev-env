#!/bin/bash

while true; do
    curl localhost:3001/create-random-todo &> /dev/null
    sleep 1
done