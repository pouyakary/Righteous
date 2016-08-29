
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

        //
        // ─── BODY ────────────────────────────────────────────────────────
        //

            for ( let index = 0; index < code.length; index++ ) {
                let character = code[ index ];

                switch ( character ) {
                    case '(':
                        parenthesesIndentation++;
                        break;
                    case ')':
                        parenthesesIndentation--;
                        break;

                    case '[':
                        bracketsIndentation++;
                        break;
                    case ']':
                        bracketsIndentation--;
                        break;

                    case '{':
                        curlyBracketsIndentation++;
                        break;
                    case '}':
                        curlyBracketsIndentation--;
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
