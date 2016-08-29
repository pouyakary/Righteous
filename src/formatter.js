
//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const typeScriptFormatter = require( './ts-formatter.js' );

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    module.exports = ( tree ) => {
        return format( tree );
    }

//
// ─── BODY ───────────────────────────────────────────────────────────────────────
//

    function format ( tree ) {

        //
        // ─── DEFS ────────────────────────────────────────────────────────
        //

            let currentIndentationLevel = 0;

        //
        // ─── FUNCTIONS ───────────────────────────────────────────────────
        //

            function handleNormalBunch ( bunch ) {

            }

        //
        // ─── BODY ────────────────────────────────────────────────────────
        //

            tree.forEach( bunch => {
                switch ( bunch.kind ) {
                    case 'normal':
                        handleNormalBunch( bunch );
                        break;

                    
                }
            });

        // ─────────────────────────────────────────────────────────────────

    }

//
// ─── INDENT ─────────────────────────────────────────────────────────────────────
//

    /** indents a line at a level that you want.
     * @param {string} bunch
     * @param {number} level
     */
    function indent ( bunch, level ) {
        let indentationUnit = '';
        for ( let i = 0; i < level; i++ ){
            indentationUnit += '    '; // 4 spaces
        }
        // I have to say, this is the coolest single line of code I've ever written
        return bunch.split( '\r\n' ).map( line => indentationUnit + line ).join('\r\n');
    }

// ────────────────────────────────────────────────────────────────────────────────