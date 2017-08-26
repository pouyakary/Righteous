

//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    module.exports = code => removeTrailingWhiteSpace( code );

//
// ─── WHITE SPACE REMOVER ────────────────────────────────────────────────────────
//

    /** @param {string} code */
    function removeTrailingWhiteSpace ( code ) {
        return code .split( '\n' )
                    .map( line => line.replace( /[ \t]+$/m, '' ) )
                    .join( '\n' )
    }

// ────────────────────────────────────────────────────────────────────────────────
