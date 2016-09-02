

//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    /** @param {string} code */
    module.exports = code => analyseIndentation( code );

//
// ─── INDENTATION ANALYSER ───────────────────────────────────────────────────────
//

    function analyseIndentation ( code ) {

        //
        // ─── CONSTANTS ───────────────────────────────────────────────────
        //

            const codeLength = code.length;

        //
        // ─── DEFS ────────────────────────────────────────────────────────
        //

            let stack = [ ];

            let opens = false;
            let ends = false;

            let currentLine = 0;

        //
        // ─── BODY ────────────────────────────────────────────────────────
        //

            for ( let index = 0; index < codeLength; index++ ) {
                // defs
                let character = code[ index ];

                // to make our life much more easy...
                /** @param {string} literal */
                function skipString ( literal ) {
                    let onScapeSequenceSign = false;
                    while ( index < codeLength ) {
                        character = code[ ++index ];
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
                /** @param {number} x */
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


                // check stack to pop
                function popStack ( char ) {
                    if ( stack.length === 0 ) {
                        stack.push( char );
                        ends = true;
                        return;
                    }
                    let pairs = { '(': ')', '{': '}', '[': ']' };
                    let TOS = stack.pop( );
                    if ( TOS === ']' || TOS === '}' || TOS === ')' ) {
                        stack.push( TOS );
                        stack.push( char );
                        ends = true;
                    }
                }


                // body
                switch ( character ) {
                    case '\n':
                        currentLine++;
                        break;

                    case '(':
                    case '[':
                    case '{':
                        stack.push( character );
                        break;

                    case ')':
                    case ']':
                    case '}':
                        popStack( character );
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
        // ─── CHECKING THE RESULTS ────────────────────────────────────────
        //

            if ( stack.length > 0 ) {
                switch ( stack.pop( ) ) {
                    case '(':
                    case '{':
                    case '[   ':
                        opens = true;
                        break;
                }
            }

        //
        // ─── DONE ────────────────────────────────────────────────────────
        //

            return { opens: opens, ends: ends };

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────