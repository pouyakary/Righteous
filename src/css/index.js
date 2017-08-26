

//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016-present By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── CSS FORMATTER MAIN ─────────────────────────────────────────────────────────
//

    const css = require('css')

    const ast = css.parse(`
        b {
            font-weight: bold;
        }

        :root,
        a:focus,
        p,
        h1, h2, strong {
            margin: 20pt;
            --var-name: calc( 20pt );
        }
    `)

    const formattedStyleSheet = formatStyleSheet( ast.stylesheet )

    console.log( formattedStyleSheet )

//
// ─── FORMAT STYLESHEET ──────────────────────────────────────────────────────────
//

    function formatStyleSheet ( stylesheet ) {
        const { rules } = stylesheet
        const results = [ ]

        const sortedRules =
            rules.sort( ( a, b ) => getRuleHeader( a ) > getRuleHeader( b ) )

        for ( const rule of sortedRules )
            results.push( formatRule( rule ) )

        return results.join('\n\n')
    }

//
// ─── SORT RULES ─────────────────────────────────────────────────────────────────
//

    function formatRule ( rule ) {
        const { selectors, declarations } = rule

        // header
        const formattedHeader = getRuleHeader( rule )

        // body
        const formattedDecelerations = [ ]
        const maxPropertyLength =
            getMaxPropertyNameLength( declarations )
        const padSize =
            ( Math.ceil( ( maxPropertyLength + 1 ) / 4 ) + 1 ) * 4

        const sortedDeclarations =
            declarations.sort( ( a, b ) => a.property > b.property )

        for ( const deceleration of sortedDeclarations )
            formattedDecelerations.push(
                formatSingleDeceleration( deceleration, maxPropertyLength, padSize ))

        const formattedBody =
            indentCodeByOneLevel( formattedDecelerations.join('\n') )

        // done
        return formattedHeader + " {\n" + formattedBody + "\n}"
    }

//
// ─── MAX PROPERTY NAME LENGTH ───────────────────────────────────────────────────
//

    function getMaxPropertyNameLength ( declarations ) {
        const propertyLengths =
            declarations.map( deceleration => deceleration.property.length )
        return Math.max( ...propertyLengths )
    }

//
// ─── PAD PROPERTY NAME WITH MAX LENGTH TO THE STANDARD SIZE ─────────────────────
//

    function padPropertyNameWithMaxLength ( propertyName, maxPropertyLength, padSize ) {
        const buffer =
            propertyName.split('')
        buffer.push(':')

        for ( let counter = buffer.length; counter < padSize; counter++ )
            buffer.push(' ')

        return buffer.join('')
    }

//
// ─── FORMAT SINGLE DECLARATION ──────────────────────────────────────────────────
//

    function formatSingleDeceleration ( deceleration, maxPropertyLength, padSize ) {
        const { property, value } = deceleration
        const paddedPropertyName =
            padPropertyNameWithMaxLength( property, maxPropertyLength, padSize )

        return paddedPropertyName + value + ';'
    }

//
// ─── INDENT STRING ──────────────────────────────────────────────────────────────
//

    function indentCodeByOneLevel ( code ) {
        return code .split('\n')
                    .map( line => "    " + line )
                    .join('\n')
    }

//
// ─── GET RULE HEADER ────────────────────────────────────────────────────────────
//

    function getRuleHeader ( rule ) {
        const { selectors } = rule
        return selectors.sort( ).join(', ')
    }

// ────────────────────────────────────────────────────────────────────────────────
