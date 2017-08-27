
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const { cssFormatter } = require( '../src/index.js' )

//
// ─── SAMPLE CODE ────────────────────────────────────────────────────────────────
//

    const sampleCode = (`
        @media ( max-width: 100pt ) {
            header {
                color: #eee;
            }
        }

        @page {

        }

        @page:left {
            margin: right;
        }
    `)

//
// ─── FORMATTING ─────────────────────────────────────────────────────────────────
//

    console.log( cssFormatter( sampleCode ) )

// ────────────────────────────────────────────────────────────────────────────────
