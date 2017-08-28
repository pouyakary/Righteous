
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const { cssFormatter } = require( '../src/index.js' )

//
// ─── SAMPLE CODE ────────────────────────────────────────────────────────────────
//

    const sampleCode = (`
        figure.wide-image > figcaption {
            --horizontal-margin:
                calc( var( --image-wide-caption-page-margin ) - var( --image-wide-margin ) );

            font-family:        "MyriadPro-Regular";
            font-size:          0.6rem;
            letter-spacing:     0.15em;
            padding:            0.1cm var( --horizontal-margin ) 0 var( --horizontal-margin );
            text-align:         right;
            text-transform:     uppercase;
        }
    `)

//
// ─── FORMATTING ─────────────────────────────────────────────────────────────────
//

    console.log( cssFormatter( sampleCode ) )

// ────────────────────────────────────────────────────────────────────────────────
