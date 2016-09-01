
<img src="https://cloud.githubusercontent.com/assets/2157285/18159642/ea4d67e2-703e-11e6-9111-dae6fad8b766.png" width="130"
> 

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
/node_modules/righteous/typings/righteous.d.ts
```

<br />
<a href="http://www.karyfoundation.org/">
    <img src="http://www.karyfoundation.org/foundation/logo/github-full-horse.png" width="250"/>
</a>
