
//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const typeScriptFormatter = require( './typescript-formatter.js' );

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

            let result = '';
            let currentIndentationLevel = 0;
            let currentCommentWidth = 1200;

        //
        // ─── FUNCTIONS ───────────────────────────────────────────────────
        //

            function handleNormalBunch ( bunch ) {
                let formattedCode = typeScriptFormatter( bunch.value );
                formattedCode = indent( formattedCode, currentIndentationLevel );
                result += formattedCode;
            }

            function handleKFStartBunch ( bunch ) {
                result += `\r\n${ indent( bunch.value , currentIndentationLevel ) }\r\n`
                currentIndentationLevel++;
            }

            function handleKFEndBunch ( bunch ) {
                currentIndentationLevel--;
                result += `\r\n${ indent( bunch.value , currentIndentationLevel ) }\r\n`
            }

        //
        // ─── BODY ────────────────────────────────────────────────────────
        //

            for ( bunch of tree ) {
                switch ( bunch.kind ) {
                    case 'normal':
                        handleNormalBunch( bunch );
                        break;

                    case 'kfstart':
                        handleKFStartBunch( bunch );
                        break;

                    case 'kfend':
                        handleKFEndBunch( bunch );
                        break;
                }
            }

        //
        // ─── DONE ────────────────────────────────────────────────────────
        //

            return result;

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