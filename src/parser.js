
//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const sectionCommentRegex = /^\s*\/\/ [\u2500]{3}[A-Z0-9 ]+[\u2500]+\s*$/g;
    const endingCommentRegex  = /^\s*\/\/ [\u2500]+\s*$/g;

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//


    module.exports = ( code ) => {
        return getCommentIndentations( code );
    }

//
// ─── GET COMMENT INDENTATIONS ───────────────────────────────────────────────────
//

    /**
     * Generates an array of code parts and Kary Foundation comments.
     * @param {string} code Program's source code
     * @return {string[]} results
     */
    function getCommentIndentations ( code ) {

        //
        // ─── DEFS ────────────────────────────────────────────────────────
        //

            /** The resulting parts array */
            let result = [ ];
            /** Contains the last part node's value */
            let currentBunch = "";
            /** With of Kary Comments content. */
            let currentCommentWidth = 0;
            /**
             * 0 -> means no. 1 -> Means read the first line and 2 when it's reading the
             * content line' the sames
             */
            let onReadingKaryComment = 0;
            /** Bunch cleaned */
            let bunchCleaned = true;

        //
        // ─── FUNCTIONS ───────────────────────────────────────────────────
        //

            /** @param {string} line */
            function parseSingleLineComments ( line ) {

                if ( /^\s*\/\/\s*$/.test( line ) ) {
                    // reading the first //
                    if ( onReadingKaryComment === 0 ) {
                        endCurrentBunch( );
                        addALineToTheCurrentBunch( line );
                        onReadingKaryComment = 1;
                    }
                    // reading the last //
                    else {
                        addALineToTheCurrentBunch( line );
                        onReadingKaryComment = 0;
                        endCurrentBunch( 'kfstart' );
                    }
                }

                else if ( sectionCommentRegex.test( line ) ) {
                    addALineToTheCurrentBunch( line );
                    onReadingKaryComment = 2;
                }

                else if ( endingCommentRegex.test( line ) ) {
                    endCurrentBunch( );
                    addALineToTheCurrentBunch( line );
                    endCurrentBunch( 'kfend' );
                }

                else {
                    addALineToTheCurrentBunch( line );
                }
            }

            /** End Current Bunch
             * @param {string} kind normal | kfstart | kfend */
            function endCurrentBunch ( kind ) {
                bunchCleaned = true;
                result.push({
                    kind: ( kind )? kind : 'normal',
                    value: currentBunch
                });
                currentBunch = '';
                onReadingKaryComment = 0;
            }

            /** Adds a new line
             * @param {string} newline */
            function addALineToTheCurrentBunch ( newline ) {
                bunchCleaned = false;
                currentBunch += `${ newline.trim() }\r\n`;
            }

        //
        // ─── SWITCHING BODY ──────────────────────────────────────────────
        //

            // visit each and every line
            code.split( '\n' ).forEach( line => {
                // single comment line
                if ( /^\s*\/\//.test( line ) ) {
                    parseSingleLineComments( line );
                } else {
                    addALineToTheCurrentBunch( line );
                }
            });

        //
        // ─── DONE ────────────────────────────────────────────────────────
        //

            if ( bunchCleaned === false ) {
                endCurrentBunch( );
            }

            return result;

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
