# angular-fe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via Jest

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
It is also possible, if your FE app is already running locally, to run `npm run e2e:local` for a speedier runtime.

## Adding Design libraries

### Bootstrap

1. Run `npm install bootstrap@3 jquery --save`

1. This installs Bootstrap and jQuery into the node_modules folder within the project directory and makes sure that both dependencies are added to the package.json file as well.

1. After both packages have been installed successfully the file paths can be added to the styles and scripts array in the file `.angular-cli.json`:

```
"styles": [
    "styles.css",
    "./node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
"scripts": [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js"
  ],
```

### Material UI

1. Run `npm install --save @angular/material @angular/cdk`

1. This installs Angular Material and Angular CDKinto the node_modules folder within the project directory and makes sure that both dependencies are added to the package.json file as well.

1. Import the NgModule for each component you want to use:

```
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
  ...
  imports: [MatButtonModule, MatCheckboxModule],
  ...
})
export class PizzaPartyAppModule { }
```

> #### Adding Material Animations
>
> Some Material components depend on the Angular animations module in order to be able to do more advanced transitions. If you want these animations to work in your app, you have to install the `@angular/animations` module and include the `BrowserAnimationsModule` in your app.
>
> Run `npm install --save @angular/animations`

For further information see https://material.angular.io/guide/getting-started
