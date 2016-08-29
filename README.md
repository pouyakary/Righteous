
# Righteous
Kary Foundation Coding Style based code formating server for TypeScript and JavaScript for use within KF's IDES and Editors, presenting the following advantages:

- Understands Kary Foundation Comment's Indentation
- Understands Kary Foundation's Spacing Policy
- Supports TypeScript (Uses TypeScript's own compiler service APIs)

### Usage?
Installation:
```
% npm install righteous --save
```
And then ready to use:
```TypeScript
import righteous = require('righteous');
let mySourceFile = "..." // some source code...
let myFormattedSourceFile = righteous( mySourceFile );
```
The `.d.ts` declaration file is included within the project. Your compiler must auto detect it but if it can't then use:
```
/node_modules/righteous/righteous.d.ts
```