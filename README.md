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

-From root: ```node run server```
-```cd app```
-```npm start``` - **will run the prototype in development mode, ```npm build app``` wont work as backend proxy is configured for development and API requests will fail.**
