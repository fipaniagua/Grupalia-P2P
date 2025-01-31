# OverView

This repository contains both the frontend and backend of an application that facilitates cash buy-and-sell offers. The application follows a mobile-first approach (specifically designed with an iPhone SE in mind, although it is responsive) due to the use of *MUI*.

## Backend

The backend is located in the P2PApi folder and consists of a RESTful API built with Ruby on Rails. SQLite was used as the database, and currently, the backend manages a model called Bid, which is responsible for storing and filtering offers from different buyers.

## Frontend

The frontend was developed using React and Next.js, utilizing the latest version of Node.js. **Currently, the client user is hardcoded with the name "Julio"**, so when creating and reviewing offers, they will be filtered according to the business logic applied to Julio.

## Set Up

## Backend

### prerequisites
- Ruby
- Ruby On Rails

First, it is necessary to run the migrations.

    db:migrate

Then, it is necessary to run the seed.

    db:seed

And finally, run the program that will be served on port **3000**.
    rail server

## Frontend

### prerequisites

- NVM

Make sure you are using the latest version of Node. If you have NVM installed, simply run:

    nvm use -lts

Then, it is necessary to install the dependencies.

    npm install

And finally, run the frontend that will be served on the port **8080**      

    npm run dev