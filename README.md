
![Righteous Title Logo](https://user-images.githubusercontent.com/2157285/45636152-3031fb00-babc-11e8-92f9-e3ce93b1ca09.png)

<br>

Righteous is a modern CSS 3 formatter that implements the [Kary Coding Standard for CSS](https://coding.standards.kary.us/languages/css). It is a rewriting parsing parser; It reads your CSS code into an AST (abstract syntax tree) and the rewrites that AST into code. This technique allows Righteous to fully format the code based on the specification. This package is the core righteous formatter to be used within other software such as [Righteous for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=karyfoundation.righteous) and similar software.

<br>

## How Does It Look?
![](https://user-images.githubusercontent.com/2157285/45636305-9b7bcd00-babc-11e8-87f6-5e1b1a4d7088.png)


## Usage?

Installation:

```shell
$ npm install righteous-core --save
```

And then ready to use:

```javascript
const righteous =
    require( 'righteous-core' )
const code =
    "h1 { color: red }"

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
