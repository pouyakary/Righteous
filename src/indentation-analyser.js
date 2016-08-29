
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
        // ─── CONSTANTS ───────────────────────────────────────────────────
        //

            const codeLength = code.length;

        //
        // ─── DEFS ────────────────────────────────────────────────────────
        //

            let parenthesesIndentation = 0;
            let bracketsIndentation = 0;
            let curlyBracketsIndentation = 0;

            let currentLine = 0;
            let lastIncrementedLine = -1;
            let lastDecrementedLine = -1;

            let totalIndentation = 0;

        //
        // ─── BODY ────────────────────────────────────────────────────────
        //

            for ( let index = 0; index < codeLength; index++ ) {
                // defs
                let character = code[ index ];

                // to make our life much more easy...
                function skipString ( literal ) {
                    let onScapeSequenceSign = false;
                    while ( index < codeLength ) {
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
                function changeTotalIndentationBy ( x ) {
                    if ( x > 0 ) {
                        if ( currentLine > lastIncrementedLine ) {
                            totalIndentation += x;
                            lastIncrementedLine = currentLine;
                        }
                    } else {
                        if ( currentLine > lastDecrementedLine ) {
                            totalIndentation += x;
                            lastDecrementedLine = currentLine;
                        }
                    }
                }


                // scape comments...
                function skipComments ( ) {
                    if ( index < codeLength ) {
                        character = code[ ++index ];
                        if ( character === '/' ) {
                            while ( index < codeLength && code[ ++index ] !== '\n' ) { }

                        } else if ( character === '*' && index + 3 < codeLength ) {
                            let onAsterisk = false;
                            while ( index < codeLength ) {
                                character = code[ ++index ];
                                if ( character === '*' ) {
                                    onAsterisk = true;
                                } else {
                                    if ( character === '/' && onAsterisk ) {
                                        return;
                                    }
                                    onAsterisk = false;
                                }
                            }

                        } else {
                            index--;
                            return;
                        }
                    }
                }


                // body
                switch ( character ) {
                    case '\n':
                        currentLine++;
                        break;

                    case '(':
                        parenthesesIndentation++;
                        changeTotalIndentationBy( 1 );
                        break;
                    case '[':
                        bracketsIndentation++;
                        changeTotalIndentationBy( 1 );
                        break;
                    case '{':
                        curlyBracketsIndentation++;
                        changeTotalIndentationBy( 1 );
                        break;

                    case ')':
                        parenthesesIndentation--;
                        changeTotalIndentationBy( -1 );
                        break;
                    case ']':
                        bracketsIndentation--;
                        changeTotalIndentationBy( -1 );
                        break;
                    case '}':
                        curlyBracketsIndentation--;
                        changeTotalIndentationBy( -1 );
                        break;

                    case "'":
                    case '"':
                    case '`':
                        skipString( character );
                        break;

                    case '/':
                        skipComments( );
                        break;
                }
            }

        //
        // ─── DONE ────────────────────────────────────────────────────────
        //

            return totalIndentation;

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
