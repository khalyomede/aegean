# aegean

Include the content of imports statements down to the importing file.

![npm](https://img.shields.io/npm/v/aegean.svg)
![NpmLicense](https://img.shields.io/npm/l/aegean.svg)
![Codeship](https://img.shields.io/codeship/06d78710-d8ad-0136-0ad9-0ac09399d815.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/khalyomede/aegean/badge.svg?targetFile=package.json)](https://snyk.io/test/github/khalyomede/aegean?targetFile=package.json)


Before:

```javascript
import './helper/add';

const result = add(1, '+', 2); // 3
```

After:

```javascript
function add(left, operator, right) {
    let result = 0;

    switch(operator) {
        case '+':
            result = left + right;

            break;
    }

    return result;
}

const result = add(1, '+', 2); // 3
```

## Summary

- [Installation](#installation)
- [Usage](#usage)
- [Supported imports methods](#supported-imports-methods)
- [Contributing](#contributing)

## Installation

With npm:

```bash
npm install --save-dev aegean
```

With yarn:

```bash
yarn add --dev aegean
```

## Usage

- [Example 1: simple usage](#example-1-simple-usage)
- [Example 2: importing file with nested imports](#example-2-importing-file-with-nested-imports)
- [Example 3: importing a node module](#example-3-importing-a-node-module)

### Example 1: simple usage

_main.js_
```javascript
import "add";

const result = add(1, "+", 2);

console.log(result); // 3
```

_example-1.js_
```javascript
const aegan = require("aegean");
const fs = require("fs");

const result = aegan("example/example-1/main.js");

fs.writeFileSync("example/example-1/inlined-main.js", result);
```

_inlined-main.js_
```javascript
function add(left, operator, right) {
  let result = 0;

  switch (operator) {
    case "+":
      result = left + right;

      break;
  }

  return result;
}


const result = add(1, "+", 2);

console.log(result); // 3
```

### Example 2: importing file with nested imports

_is_string.js_

```javascript
function is_string(mixed) {
  return (
    mixed !== null && mixed !== undefined && mixed.constructor === String
  );
}
```

_echo.js_

```javascript
import "is_string";

function echo(mixed) {
  if (is_string(mixed) === false) {
    throw new Error("echo expects parameter 1 to be a string");
  }

  console.log(mixed);
}
```
 
_main.js_

```javascript
import "echo";

echo("hello world");
```

_example-2.js_

```javascript
const fs = require("fs");
const aegean = require("aegean");

const result = aegean(__dirname + "/example-2/main.js");

fs.writeFileSync(__dirname + "/example-2/inlined-main.js", result);
```

_inlined-main.js_

```javascript
function is_string(mixed) {
  return (
    mixed !== null && mixed !== undefined && mixed.constructor === String
  );
}


function echo(mixed) {
  if (is_string(mixed) === false) {
    throw new Error("echo expects parameter 1 to be a string");
  }

  console.log(mixed);
}


echo("hello world");
```

### Example 3: importing a node module

_main.js_

```javascript
import "bootstrap/dist/js/bootstrap"
```

_example-3.js_

```javascript
const aegean = require('aegean');
const fs = require('fs');

const bootstrap4 = aegean(__dirname + '/main.js');

fs.writeFileSync(__dirname + '/inlined.js', bootstrap4);
```

_inlined.js_

```javascript
/*!
  * Bootstrap v4.2.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :

  ...
```

## Supported imports methods

```javascript
import './path/to/local/file';
import './path/to/local/file.js';
import 'path/to/node/module/file';
import 'path/to/node/module/file.js';
```

## Contributing

1. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

2. Light on dev (transpiling typescript to javascript)

```bash
npm run dev
```

or

```bash
yarn dev
```

3. Add your feature on `/src/main.ts`
4. Append your tests on `/test/aegean.js`
5. Run tests

```bash
npm run test
```

or

```bash
yarn test
```