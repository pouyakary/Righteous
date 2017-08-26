

//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── TEST ───────────────────────────────────────────────────────────────────────
//

    const righteous = require( '../src/typescript/index.js' );
    const fs = require( 'fs' );
    const path = require( 'path' );

    const code = fs.readFileSync( path.join( __dirname, 'code.js' ), 'utf8' );

    const formattedCode = righteous( code );

    console.log( formattedCode );

// ────────────────────────────────────────────────────────────────────────────────