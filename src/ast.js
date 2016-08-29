
//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const TypeScript = require('typescript-api');

//
// ─── GET TYPESCRIPT AST ─────────────────────────────────────────────────────────
//

    module.exports = ( code ) => {
        return TypeScript.Parser.parse(
            'code.ts',
            TypeScript.SimpleText.fromString( code ),
            false /* is .d.ts? */,
            new TypeScript.ParseOptions(
                TypeScript.LanguageVersion.EcmaScript6,
                true /* allow ASI? */
        ));
    }

// ────────────────────────────────────────────────────────────────────────────────