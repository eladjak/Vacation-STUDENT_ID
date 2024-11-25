#!/bin/bash

# Wait for MySQL
./wait-for-it.sh db:3306 -- echo "MySQL is up"

# Start the application
npm start
