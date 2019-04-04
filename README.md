# angular-fe

A (slightly) opinionated kick-starter Angular 7 app with baked in goodness such as testing, and ocp readiness

## Getting started

In order to get started, run the following command (replacing `<new-app-name>` with the new app name you want):

```
LC_CTYPE=C && LANG=C && find . -type f ! -regex '.*/\(node_modules\).*' ! -regex '.*/\(.git\).*' -exec sed -i '' 's/angular-fe/<new-app-name>/g' {} \;
```

Now create a git repo in your git store with the same name as your app and run `git remote set-url origin <git-url>` which will point this app to your new repo. Then run `git push -u origin master` to get started.

## App structure

The app is set out to make development of components and modules easier. The following app structure applies:

```
src
├── app
|   ├── components
|   ├── models
|   ├── modules
|   ├── services
|   ├── shared
|   └── utils
└── assets
```

### Components

In the components directory we store components which are used in the main module (at the root of the application). This will probably be just a home page and any related stuff.

### Models

This is where we store typescript model definitions which will be used in the app. For example we may store a `User` definition here which defines the `User` type.

### Modules

We generate a module for each section of the application. In this example application we have implemented lazy loading of each module. This is defined by the routing off the app. It is probably best to base each model on the route of the app (eg `example.com/apply` may be in an `apply` module). To create a new module it is best to run `ng generate module modules/<module-name>`. Components within this module can then be created by running `ng generate component modules/<module-name>/<component-name>`. By convention we like to use the module name in the component name so it will also be present in the app-tag. (eg. our `lazy` module contains a `lazy-explanation` component).

### Services

This is a directory in which to store all angular services. Further information about services can be found [on the Angular tutorial pages](https://angular.io/tutorial/toh-pt4).

> #### Env Service
>
> We have included an `env service` which is used to inject variables to the application (such as api urls). We inject this using a configmap and retrieved by `env.customEnv` and is injected in `.openshift-applier/inventory/group_vars/all.yml` through the `CUSTOM_ENV` ansible variable.

### Shared

If we have components which are reused throughout the application we place them in the `shared` directory. We then import the `SharedModule` within each other module to gain access. Make sure each component in the shared module is exported in `shared.module.ts`

### Utils

A utils file is stored in this directory which is used to keep common functions which may be used through the app. As a starter we have included navigation and getting the current route.

## Running the app

Run `npm run start` for the app to run locally. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Unit Testing

We are using Jest as our testing framework for the application due to its faster runtime and greater adaptability. For this reason `ng test` will _not_ work

### Running unit tests

Run `npm run test` to execute the unit tests via Jest

## End-to-end testing

### Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
It is also possible, if your FE app is already running locally, to run `npm run e2e:local` for a speedier runtime. If you are utilising the dev-server then this will also be started for you.

### Using Common.po.ts

We have included a file (`common.po.ts`) of common functions used with e2e testing (such as navigating to a page or getting a button by its text). More can be added to this file for generic functions you will use throughout your app. For less generic functions, add them to the page's page.po.ts file which you should create (e.g. there is an `app.po.ts` file for the main app page). We do this so that we do not call `browser` or `element` from the e2e-spec file.

### Directory Structure for e2e tests

We recommend creating a new e2e test file for each module within the app. This should then be in its own directory below `e2e/src` which should contain `<module-name>.e2e-spec.ts` for the e2e tests and `<module-name>.po.ts` for the element interaction.

## Running a dev-server

We have included the `server.js` file which we use commonly to create back end mocks. It is a small express node server which contains some examples of this. It also contains an in memory DB ([LokiJS](http://lokijs.org)) to store data if required.

Run the local dev-server by running `npm run dev-server`

## Jenkinsfile

A jenkinsfile for deploying the application to Openshift is included. Some edits will be required in order to point to your application git repo as well as change the application name and the cluster url.

### System Tests

A separate Jenkinsfile is included for running system tests. This is the full e2e run using the deployed application. It is separated out as many applications may want to kick off these tests (i.e. if there is a back end change). The main Jenkinsfile has a final step to kick off this job.

## Adding Design libraries

### Bootstrap

1. Run `npm install bootstrap jquery --save`

1. This installs Bootstrap and jQuery into the node_modules folder within the project directory and makes sure that both dependencies are added to the package.json file as well.

1. After both packages have been installed successfully the file paths can be added to the styles and scripts array in the file `angular.json`:

```
"styles": [
    "styles.scss",
    "./node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
"scripts": [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js"
  ],
```

### Material UI

1. Run `npm install --save @angular/material @angular/cdk`

1. This installs Angular Material and Angular CDK into the node_modules folder within the project directory and makes sure that both dependencies are added to the package.json file as well.

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

## Contributing to this repo

If you find any bugs in this repo, feel free to contribute up or create an issue.
