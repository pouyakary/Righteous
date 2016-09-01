
//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const typeScriptFormatter = require( './part-formatter.js' );

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    module.exports = tree => format( tree );

//
// ─── BODY ───────────────────────────────────────────────────────────────────────
//

    function format ( tree ) {

        //
        // ─── DEFS ────────────────────────────────────────────────────────
        //

            let result = '';
            let currentIndentationLevel = 0;
            let currentCommentWidth = 91;

        // ─────────────────────────────────────────────────────────────────

            let currentParenthesesIndentation   = 0;
            let currentBracketsIndentation      = 0;
            let currentCurlyBracketsIndentation = 0;

        //
        // ─── FUNCTIONS ───────────────────────────────────────────────────
        //

            function decreaseIndentationBy ( x ) {
                if ( currentIndentationLevel > 0 ) {
                    currentIndentationLevel -= x;
                }
            }

        // ─────────────────────────────────────────────────────────────────

            function handleNormalBunch ( bunch ) {

                if ( bunch.indentation.ends ) {
                    decreaseIndentationBy( 2 );
                }

                let formattedCode = typeScriptFormatter( bunch.value.trim( ) );
                formattedCode = indent( formattedCode, currentIndentationLevel );
                result += formattedCode;

                if ( bunch.indentation.opens ) {
                    currentIndentationLevel += 2;
                }
            }

        // ─────────────────────────────────────────────────────────────────

            function handleKFStartBunch ( bunch ) {
                decreaseIndentationBy( 1 );
                currentCommentWidth = bunch.width;
                result += `\r\n\r\n${ indent( bunch.value , currentIndentationLevel ) }\r\n`
                currentIndentationLevel++;
            }

        // ─────────────────────────────────────────────────────────────────

            function handleKFEndBunch ( bunch ) {
                if ( bunch.width === 83 && currentCommentWidth === 76 ) {
                    decreaseIndentationBy( 1 );
                }
                decreaseIndentationBy( 1 );
                result += `\r\n\r\n${ indent( bunch.value.trim( ) , currentIndentationLevel ) }\r\n\r\n`;
                currentIndentationLevel++;
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
        // ─── FINALIZING ──────────────────────────────────────────────────
        //

            result = result.replace( /\n    \n\n/gm, '' );

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
        for ( let i = 0; i < level; i++ ) {
            indentationUnit += '    '; // 4 spaces
        }

        // I have to say, this is the coolest single line of code I've ever written
        return bunch.split( '\r\n' ).map( line => indentationUnit + line ).join('\r\n');
    }

// ────────────────────────────────────────────────────────────────────────────────