
//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    /** @param {string} code */
    module.exports = code => {

        //
        // ─── DEFS ────────────────────────────────────────────────────────
        //

            let parenthesesIndentation = 0;
            let bracketsIndentation = 0;
            let curlyBracketsIndentation = 0;

            let currentLine = 0;
            let lastAddedLine = -1;

            let totalIndentation = 0;

        //
        // ─── BODY ────────────────────────────────────────────────────────
        //

            for ( let index = 0; index < code.length; index++ ) {
                // defs
                let character = code[ index ];

                // to make our life much more easy...
                function skipString ( literal ) {
                    let onScapeSequenceSign = false;
                    while ( index < code.length ) {
                        character = code[ index ];
                        if ( character === literal ) {
                            if ( onScapeSequenceSign === false ) {
                                return;
                            } else {
                                onScapeSequenceSign = false;
                            }
                        } else if ( character === '\\' ) {
                            onScapeSequenceSign = true;
                        }
                    }
                }

                // incrementing indentation requires much care for cases like
                // .forEach( something => {..., in one line ( and { are detected
                // by line only requires one level of indentation...
                function incrementNewIndentation ( ) {
                    if ( currentLine > lastAddedLine ) {
                        totalIndentation++;
                        lastAddedLine = currentLine;
                    }
                }


                // body
                switch ( character ) {

                    case '\n':
                        currentLine++;
                        break;

                    case '(':
                        parenthesesIndentation++;
                        incrementNewIndentation( );
                        break;
                    case '[':
                        bracketsIndentation++;
                        incrementNewIndentation( );
                        break;
                    case '{':
                        curlyBracketsIndentation++;
                        incrementNewIndentation( );
                        break;


                    case ')':
                        parenthesesIndentation--;
                        break;
                    case ']':
                        bracketsIndentation--;
                        break;
                    case '}':
                        curlyBracketsIndentation--;
                        break;

                    case "'":
                    case '"':
                    case '`':
                        skipString( character );
                        break;
                }
            }

        //
        // ─── DONE ────────────────────────────────────────────────────────
        //

            return {
                parenthesesIndentation: parenthesesIndentation,
                bracketsIndentation: bracketsIndentation,
                curlyBracketsIndentation: curlyBracketsIndentation
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
