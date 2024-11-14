# create-lookup

[![License:MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![version](https://img.shields.io/badge/version-0.1.0-blue)

## Description

`create-lookup` is a utility function that simplifies the process of mapping
keys to values or actions. It allows you to replace verbose `switch` statements
or object literals with a more flexible and type-safe solution, especially in
TypeScript.

### Motivation

Many developers frequently need to write functions that check a value against a
list to return a corresponding result or perform an action. Typically, this is
done using a `switch` case or an object mapping.

`create-lookup` provides a cleaner and more maintainable approach by using a
closure around your data, returning values that match your keys from a map.

## Installation

### Deno

```shell
deno add jsr:@cstroliadavis/create-lookup
```

### Node.js

```shell
npx jsr add jsr:@cstroliadavis/create-lookup
```

## Usage

### TypeScript

```typescript
import { createLookup } from "jsr:@cstroliadavis/create-lookup";

// Define an enum or constants for your keys
enum ConfigKeys {
  MaxRetries = "maxRetries",
  Timeout = "timeout",
}

// Create a lookup function using createLookup
const configLookup = createLookup<ConfigKeys, number>({
  // Map keys to values or functions returning values
  [ConfigKeys.MaxRetries]: 5, // Direct value
  [ConfigKeys.Timeout]: () => 3000, // Function returning a value
});

// Use the lookup function to retrieve values
const maxRetries = configLookup(ConfigKeys.MaxRetries); // 5
const timeout = configLookup(ConfigKeys.Timeout); // 3000

console.log(maxRetries); // Output: 5
console.log(timeout); // Output: 3000

// If the key is not in the lookup map, the function returns undefined
const unknown = configLookup("unknownKey" as ConfigKeys);
console.log(unknown); // Output: undefined
```

### JavaScript

```javascript
const { createLookup } = require("jsr:@cstroliadavis/create-lookup");

// Define constants for your keys
const ConfigKeys = {
  MaxRetries: "maxRetries",
  Timeout: "timeout",
};

// Create a lookup function using createLookup
const configLookup = createLookup({
  // Map keys to values or functions returning values
  [ConfigKeys.MaxRetries]: 5, // Direct value
  [ConfigKeys.Timeout]: () => 3000, // Function returning a value
});

// Use the lookup function to retrieve values
const maxRetries = configLookup(ConfigKeys.MaxRetries); // 5
const timeout = configLookup(ConfigKeys.Timeout); // 3000

console.log(maxRetries); // Output: 5
console.log(timeout); // Output: 3000

// If the key is not in the lookup map, the function returns undefined
const unknown = configLookup("unknownKey");
console.log(unknown); // Output: undefined
```

## License

[MIT](./LICENSE)

Feel free to use and modify this project, and please provide attribution when
appropriate.

## Contributing

If you find a bug or have a feature request, please open an issue.

https://github.com/cstroliadavis-jsr/create-lookup/issues
