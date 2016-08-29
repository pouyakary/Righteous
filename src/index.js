
//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── TEST ───────────────────────────────────────────────────────────────────────
//

    const parser = require('./parts-parser.js');
    const formatter = require('./main-formatter.js');
    const finalizer = require('./finalizer.js');
    const fs   = require( 'fs' );
    const path = require( 'path' );

    let file = fs.readFileSync( path.join( __dirname , 'code.ts' ), 'utf8' );

    //console.log( tsFormatter( file ) );

    console.log( finalizer( formatter( parser( file ) ) ) );


// ────────────────────────────────────────────────────────────────────────────────
