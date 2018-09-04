# Sveriges Radio CLI
[![Build Status](https://travis-ci.org/ollelauribostrom/sverigesradio.svg?branch=master)](https://travis-ci.org/ollelauribostrom/sverigesradio) [![Coverage Status](https://coveralls.io/repos/github/ollelauribostrom/sverigesradio/badge.svg?branch=master)](https://coveralls.io/github/ollelauribostrom/sverigesradio?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/ollelauribostrom/sverigesradio/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ollelauribostrom/sverigesradio?targetFile=package.json) [![npm version](https://badge.fury.io/js/sverigesradio.svg)](https://badge.fury.io/js/sverigesradio)

CLI for streaming radio from Sveriges Radio (P1, P2, P3) written in JavaScript

> Currently tested on: **OSX (10.11.1)**, **Raspbian Stretch (4.9)**

Installation
-------
`npm install sverigesradio -g`    
`yarn global add sverigesradio` 

On Debian/Ubuntu, be sure to have the alsa.h header file in place:   
`sudo apt-get install libasound2-dev`

Example Usage
-----
```sh
sverigesradio
sverigesradio p1
sverigesradio p2
sverigesradio p3
```  

Running your own local development copy
-----------
```sh
# Install dependencies
npm install

# Create a symbolic link
npm link

# Start babel in watch mode
npm start

# Run your development copy
sverigesradio
```

Running the tests
-----------------
Tests: `npm test`    
Coverage: `npm run coverage`    
Linter: `npm run lint` 

Contributing
------------
All contributions are very much welcome. Please get familiar with the [contributing guide](https://github.com/ollelauribostrom/sverigesradio/blob/master/.github/CONTRIBUTING.md).

Support
-------
Please [open an issue](https://github.com/ollelauribostrom/sverigesradio/issues/new) for support.

License
-------
MIT
