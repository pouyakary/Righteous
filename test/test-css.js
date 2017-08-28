
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const { cssFormatter } = require( '../src/index.js' )
    const fs = require( 'fs' )
    const path = require( 'path' )

//
// ─── SAMPLE CODE ────────────────────────────────────────────────────────────────
//

    const getFileAddress = fileName =>
        path.join( __dirname, fileName )

    const sampleCode =
        fs.readFileSync( getFileAddress( 'test-case.css' ) , 'utf8' )

    const formattedCode =
        cssFormatter( sampleCode )

    fs.writeFileSync( getFileAddress( 'test-case-formatted.css' ), formattedCode )

// ────────────────────────────────────────────────────────────────────────────────
