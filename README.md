# aegean

Include the content of imports statements down to the importing file.

Before:

```javascript
import 'helper/add';

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

## Installation

Soon.

## Usage

Soon.