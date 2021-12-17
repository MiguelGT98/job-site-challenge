# Job Portal

## Overview

This is a job portal web application made with React, Node, Graphql and Mysql

## Try it out!

You can try the app online [https://stupefied-saha-b5a090.netlify.app/](https://stupefied-saha-b5a090.netlify.app/) or just follow the installation steps for local development.

### Installation

To run this app locally, you'll need to have Docker installed and perform the following steps:

Clone this repository.

```
git clone https://github.com/MiguelGT98/job-site-challenge.git
```

After doing that, move into the newly created folder.

```
cd reponame
```

Now, install dependencies on the host machine for both the api and client directories.

```
cd server && npm install && cd ..
```

```
cd client && npm install && cd ..
```

Build and run the containers using docker-compose.

```
docker-compose build && docker-compose up
```

After doing the previous initial setup, you don't need to build the containers again, you can just start the app by running.

```
docker-compose up
```

## Time distribution

Before starting the project I set myself up on spending around 8 hours in it. Although, if I had more time for this assignment I would definetly add a few functionalities to make it easier for the user and developer to use it:

1. Proper tests. I think I really skipped this step since I was not on the correct mindset during the week. I think I really set up myself for failure by trying to create the solution, and then see if I had some extra time for everything else. I would have set up some tests using cypress for the front end and Jest for the backend.

2. I would have implemented a proper approach for making the app real time, instead of what I did with a polling interval. There is this thing called subscriptions in Apollo (They use web sockets to establish a connection between the client and the server), which I could have used to solve the real time application count.

3. In terms of the application, I should have added better error messages and error handlers. I feel like the UX of the app could have been better with this.
