# React-IMS-Prototype installation

## Pre-requisites
- Node JS
- MySQL 8


## Clone repo

```gh repo clone krlwshu/React-IMS-Prototype```

## Install dependencies

### Express JS
```npm install``` - installs the Express dependencies required by server.js in root

### React JS
```cd app```
```npm install``` - installs the node module dependencies required by the React app.

## Install DB file to MySQL server instance

Database is located in root for convenience

- mysql -u root -p db_name < dbfile.sql

## Start server

<root>: ```node run server```
./app/ ```npm start``` - will run the prototype in development mode, build wont work as backend proxy is configured for development.
