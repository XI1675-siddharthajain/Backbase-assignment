# BackbaseAssignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Application Setup

### Installing Dependencies

Command:- "npm install"

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Unit test coverage will be automatically generated and found in [Coverage](coverage/backbase-challenge/index.html)

## Project Structure

Project is split into 2 main folders (modules and shared)

- Modules contains all the lazy loaded modules each as a standalone entity and not depending on other modules except the shared module

  Each module has these folders within them

  - Components which contains implementations of sections that can be added to pages

  - Containers which contain full pages that the routes display when redirected to them

  - Shared which contains all the shared services interfaces constants etc which only this module needs and is required in multiple components

  - Store which contains all the store logic from actions reducers effects selectors facade and the state interface

- Shared contains all the shared dependencies that all other modules need. These mainly include UI components, consts, interfaces types etc... They are included in the shared module to make the code more DRY as without it all modules will need to include its own implementation of them
