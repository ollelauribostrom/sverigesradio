# Sveriges Radio CLI
[![Known Vulnerabilities](https://snyk.io/test/github/ollelauribostrom/sverigesradio/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ollelauribostrom/sverigesradio?targetFile=package.json) [![npm version](https://badge.fury.io/js/sverigesradio.svg)](https://badge.fury.io/js/sverigesradio)

CLI for streaming Sveriges Radio (P1, P2, P3) written in JavaScript

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

Running the tests
-----------------
Tests: `npm test`    
Coverage: `npm run coverage`    
Linter: `npm run lint`    

Support
-------
Please [open an issue](https://github.com/ollelauribostrom/sverigesradio/issues/new) for support.


License
-------
MIT
