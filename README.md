# TerraJDRfrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.

## Back-end

Grab the back-end server at [**Math1987/terraJDRbackend**](https://github.com/Math1987/terraJDRbackend).  
Install the dependencies with `npm i`.  
Setup a local MySQL database named `terrajdr_db`, accessible with a passwordless `root` user. *(The easiest way to do this on Windows is with a basic Wamp installation)*  
Start the server with `npm run dev`.

By default, the account `admin@terrajdr.com` with the password `terrajdr` is generated in your database for a quick start.

## Front-end

Install the dependencies with `npm i`.  
Run `npm run start` to start the front-end locally.  
Navigate to [`http://localhost:4200/`](http://localhost:4200/).  
The app will automatically reload if you change any of the source files.

*Note: If you don't wan't to open the back-end workspace everytime you work on the front-end, you can simply run `npm run backend` within your front-end workspace if you installed the back-end in the same folder as the front-end. This will start the back-end server.*

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

## /!\ THE INSTRUCTIONS BELOW NEED TO BE UPDATED

## structure of the app

### routing 
navigate to login component if the user is not connected, watching account in service folder.
else use nav component sending to childrens "game" or "admin".

### applications
#### admin
interface with closed access for level-design allowing modifications on:

- pattern's objects in each different world,

- calculation global,

- objects in each world in real time

#### game
interface for players:

- map for the view and interactions,

- character to upgreat skills,

- rank 


#### service
Use http and socket.io to get and keep datas for user like account values or player's values and give objects to use them from the components.

The worlds service manage the access to differents worlds and the instructions receiving from the backend with socket.io.
It send them to the appropriates objects tidy in `model`, `view`, `controls` (in the world folder), to update the user's game.

View work on a static environment using OPP patterns to draw elements, builded from Models as Boxes. 

Model is used to store all the datas of the elements using by the player.

Controls give objects using OPP patterns used by interactions from components.


