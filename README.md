
<img src="https://user-images.githubusercontent.com/2157285/45589484-86c3fb80-b93b-11e8-9d5c-98910056f7ce.png" width="500" />

Righteous is a modern CSS 3 formatter that implements the [Kary Coding Standard for CSS](https://coding.standards.kary.us/languages/css). It is a rewriting parsing parser; It reads your CSS code into an AST (abstract syntax tree) and the rewrites that AST into code. This technique allows Righteous to fully format the code based on the specification. This package is the core righteous formatter to be used within other software such as [Righteous for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=karyfoundation.righteous) and similar software.

### Usage?

Installation:

```
% npm install righteous-core --save
```

And then ready to use:

```javascript
const righteous = require( 'righteous-core' )
const code = "h1 { color: red }"
try {
    const formattedCode = righteous( code )
} catch ( e ) {
    console.error( "Righteous could not format the code because of" , e )
}
```

The `.d.ts` declaration file is included within the project. Your compiler must auto detect it but if it can't then use:

```
/node_modules/righteous/typings/righteous.d.ts
```
