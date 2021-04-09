# UW Study Circle 

## Install Dependencies

**1. Check if you have a recent version of [Node.js](https://nodejs.org/) (which comes bundled with [npm](https://www.npmjs.com/), a JavaScript package manager):**

```bash
$ node -v
```

```bash
$ npm -v
```

**2. In the _project root directory_ install all the dependencies and libs:**

```bash
$ npm install
```

## Start webpack-dev-server

**1. Run the following command:**

```bash
$ npm run start
```

**Or to generate all the bundle:**

```bash
$ npm run build
```

The files will be created in the folder **/dist**.

**2. And then access [http://localhost:8080/](http://localhost:8080/) on your browser (it's setup to open automatically).**

## Testing

We will be testing the frontend using Jest, a JavaScript testing framework. It will help us perform unit testing on all the componets and generate code coverage report.

## Intallation

Install jest testing framework

```bash
$ npm i jest --save-dev
```

Install the Jest CLI globally and run the test:

```bash
$ npm i jest-cli -g
$ jest
```


