# High_Paw

High Paw is a deployed, full-stack application, where the main idea is that users can create, attend and modify playdates for their furry companions via geolocation, and the profile page contains the furry companion info.

## Task

The project fulfills Job function 1 through 6 as a full-stack app, using MERN stack.
The folder structure contains 4 main parts:

- GitHub/workflow
- client
- server
- docker-compose.yml

Includes the following competencies:

- JF 1.1 Can explain all stages of the software development life cycle (what each stage contains, including the inputs and outputs)
- JF 1.5 Can work effectively and contribute appropriately on a team to produce software
- JF 1.6 Can follow software designs and functional/technical specifications
- JF 1.7 Can follow company, team or client approaches to continuous integration, version, and source control
- JF 2.3 Can develop effective user interfaces
- JF 2.4 Can create simple software designs to effectively communicate an understanding of the program
- JF 2.5 Can implement a responsive User Interface
- JF 3.2 Can explain the principles and uses of relational and non-relational databases
- JF 3.3 Can link code to data sets
- JF 3.6 Can implement a RESTful API
- JF 4.3 Is able to build, manage and deploy code into the relevant environment
- JF 5.1 Knows relevant and up-to-date software testing frameworks and methodologies
- JF 6.2 Understands how to follow company, team or client approaches to continuous integration, version, and source control
- JF 6.4 Works independently and takes responsibility. For example, has a disciplined and responsible approach to risk, and stays motivated and committed when facing challenges
- JF 6.6 Shows initiative for solving problems within their own remit, being resourceful when faced with a problem to solve
- JF 6.7 Communicates effectively in a variety of situations to both a technical and nontechnical audience.

## Action

I served as a front-end developer and played a key role in designing the application's user interface and overall user experience, aiming to develop a user-friendly web application with features like geolocation, form validation, and pagination.
Throughout the project, my colleague(Sheree) and I worked together as a pair, ensuring constant communication and code review to maintain high coding standards, and refactoring where necessary.
I was responsible for integrating geolocation functionality into the application, enabling users to access location-based features, creating form validations for login, register forms, and adding pagination features to both 'hangouts' and 'facts' pages.
Worked and collaborated with the backend (Patrick and Kharmalina) to connect the login and registration routes.

## Result && Video presentation of the project

- [High Paw App](https://high-paw-ugau.onrender.com/mainpage)
- # [Project presentation](https://www.youtube.com/watch?v=b6yPHPoDQ2Y)

## Features

MVP

- Login and Register Functionality high-level authentication and authorization
- Map functionality
  Stretch Goals
- Blog feature including posts, recipes, facts, etc

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Client folder:

`VITE_MAPBOX_API`

Server folder:

`PORT`

`MONGODB_URI`

`DB_NAME`

`ACCESS_TOKEN_SECRET`

`REFRESH_TOKEN_SECRET`

## Installation

Install High Paw with npm

```bash
  cd client
  npm install
  npm run dev
```

```bash
  cd server
  npm install
  npm start
```

Install High Paw with Docker Compose

```bash
  docker-compose up
```

## Authors

- [Kharmalina Tong](https://www.github.com/Kharmalina)
- [Patrick Borgella Jr](https://github.com/Patrickb001)
- [Adrian Baltag](https://github.com/adrianbaltag)
- [Sheree Edmund](https://github.com/Sheree1986)

## Acknoledgements

- [Awesome Readme Templates](https://readme.so/editor)
