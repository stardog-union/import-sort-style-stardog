# import-sort-style-stardog

Stardog [import-sort](https://github.com/renke/import-sort) styles

## Usage

Install [import-sort-style-stardog](https://github.com/stardog-union/import-sort-style-stardog)

In `.importsortrc`

```
".js, .ts, .tsx": {
  "parser": "typescript",
  "style": "stardog"
}
```

Or `package.json`

```
"importSort": {
  ".js, .ts, .tsx": {
    "parser": "typescript",
    "style": "stardog"
    }
}
```

## Style

```
import "foo"

import "./foo"

import … from "foo";

import … from "src/foo";

import … from "./foo";
import … from "../foo";
```
