# My REST Web App

Welcome to My MERN (MongoDB, Express, React, Node.js) Web App! This project is a web application built using the MERN stack to display CRUD operations on a database of products. 

## Prerequisites

Before you can run the web app locally, make sure you have the following installed on your system:

- Node.js and npm (Node Package Manager)
- MongoDB (admin database with a products collection)
- You can import the products to mongodb using the products.json file located in the backend directory. 
- I used mongodb://0.0.0.0:27017/admin as my mongo url but please edit this to your own (if it is different) in the mongo.js file in the backend directory.

## Installation
### If it does not run on localhost:8080 please cd into the my-app directory and hit 'npm start', it should then run on localhost:3000

1. If Cloning from github (wait until products display from db else it wont function properly):

```bash
git clone https://github.com/justineclaire/RESTproject
cd RESTproject
cd backend 
npm install

cd ..
cd my-app
npm install
npm run build

cd ..
cd backend
node index.js
```

2. If running uploaded code (wait until products display from db else it wont function properly):
- please open a terminal and run these commands, it should display on localhost:8080/index.html

```bash
cd RESTproject
cd backend 
npm install

cd ..
cd my-app
npm install
npm run build

cd ..
cd backend
node index.js




