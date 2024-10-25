# BrightSign - Sample Node App with UDP

A small app to test BrightSign Node.js functionality. This app loads a simple web page, styled with Tailwind CSS, that sends a UDP message on button click.

## Install

Download or clone this repo with:

```
git clone https://github.com/rollmug/brightsign-html-demo.git
```

Initialize the app:

```
cd brightsign-html-demo
```

```
npm install
```

## Environment Vars

Create a `.env` file in the root of this directory. Add the following variables, and customize as needed:

```bash
# the port to serve the node app on
PORT=3000

# ip address or host of brightsign
UDP_SERVER=localhost

# port of running brightsign
UDP_PORT=12345
```

## Bundle

You'll need to bundle the app using webpack. Use the included shortcut to bundle both the server and client side scripts, and automatically create a zip file:

```
npm run build
```

This will create a new `dist` directory with the needed files.

## Test

To test locally in a browser, you can run:

```
npm start
```

Then, open a browser with http://localhost:3000 (or whatever port you specified in `.env`)

![Screenshot](https://cdn.statically.io/gh/rollmug/static-assets/master/images/node-test.png)