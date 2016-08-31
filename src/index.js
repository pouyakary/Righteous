
//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const parser = require('./parts-parser.js');
    const formatter = require('./main-formatter.js');

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    module.exports = code => formatter( parser( code ) );

// ────────────────────────────────────────────────────────────────────────────────
