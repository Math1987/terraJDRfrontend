# TerraJDRfrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Back-end connexion

The dev server is automatically connected to the back-end service on `http://localhost:4200/`.
You can get it on `https://github.com/Math1987/terraJDRbackend.git`
Note that the back-end dev service needs a local mysql environment with a DB named `terrajdr_db`, with the username root

## structure of the app

###routing 
navigate to login component if the user is not connected, watching account in service folder
else use nav component sending to childrens "game" or "admin", watching Area in service to get world or character focused

###applications
####admin
Give a level-design interface allowing modifications on pattern's objects, calculation or world in real time:
####game
Give the player interface
