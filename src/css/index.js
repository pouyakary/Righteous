

//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016-present By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const css = require( 'css' )

//
// ─── CSS FORMATTER MAIN ─────────────────────────────────────────────────────────
//

    module.exports = code => {
        const ast =
            css.parse( code )
        const formattedStyleSheet =
            formatStyleSheet( ast.stylesheet )
        return formattedStyleSheet
    }

//
// ─── FORMAT STYLESHEET ──────────────────────────────────────────────────────────
//

    function formatStyleSheet ( stylesheet ) {
        const { rules } = stylesheet
        const results = [ ]

        for ( const element of rules )
            if ( element.type === 'rule' )
                results.push( formatRule( element ) )
            else if ( element.type === 'comment' )
                results.push( formatComment( element ) )

        return results.join('\n\n')
    }

//
// ─── FORMAT COMMENT ─────────────────────────────────────────────────────────────
//

    function formatComment ( element ) {
        const { comment } = element

        if ( !/\n/.test( comment ) )
            return '/* ' + comment.trim( ) + '*/';

        const newComment =
            comment .split('\n')
                    .map( line => " " + line.trim( ) )
                    .join('\n')

        return '/*' + newComment + '*/';
    }

//
// ─── SORT RULES ─────────────────────────────────────────────────────────────────
//

    function formatRule ( rule ) {
        const { selectors, declarations } =
            rule
        const formattedHeader =
            getRuleHeader( rule )
        const formattedDecelerations =
            new Array( )
        const { listOfProperties, listOfVariables } =
            filterVariablesAndProperties( declarations )

        formatVariables( listOfVariables, formattedDecelerations )
        formatProperties( listOfProperties, formattedDecelerations )

        const formattedBody =
            indentCodeByOneLevel( formattedDecelerations.join( '\n' ) )

        return formattedHeader + " {\n" + formattedBody + "\n}"
    }

//
// ─── FILTER VARIABLES AND PROPERTIES ────────────────────────────────────────────
//

    function filterVariablesAndProperties ( declarations ) {
        const listOfProperties = [ ]
        const listOfVariables = [ ]
        for ( const deceleration of declarations )
            if (  deceleration.property.startsWith( '--' ) )
                listOfVariables.push( deceleration )
            else
                listOfProperties.push( deceleration )

        return { listOfProperties, listOfVariables }
    }

//
// ─── FORMAT VARIABLES ───────────────────────────────────────────────────────────
//

    function formatVariables ( listOfVariables, formattedDecelerations ) {
        const sortedVariables =
            sortDeclarationList( listOfVariables )

        for ( const variableDeceleration of sortedVariables )
            formattedDecelerations.push(
                formatSingleVariableDeceleration( variableDeceleration ))

        if ( formattedDecelerations.length > 0 )
            formattedDecelerations.push(' ')
    }

//
// ─── FORMAT PROPERTIES ──────────────────────────────────────────────────────────
//

    function formatProperties ( listOfProperties, formattedDecelerations ) {
        const sortedProperties =
            sortDeclarationList( listOfProperties )
        const maxPropertyLength =
            getMaxPropertyNameLength( listOfProperties )
        const padSize =
            ( Math.ceil( ( maxPropertyLength + 1 ) / 4 ) + 1 ) * 4

        for ( const propertyDeceleration of sortedProperties )
            formattedDecelerations.push(
                formatSinglePropertyDeceleration(
                    propertyDeceleration, maxPropertyLength, padSize ))
    }

//
// ─── SORT PROPERTY NAMES ────────────────────────────────────────────────────────
//

    function sortDeclarationList ( decelerationList ) {
        return decelerationList.sort( ( a, b ) => a.property > b.property )
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

    function formatSinglePropertyDeceleration ( deceleration, maxPropertyLength, padSize ) {
        const { property, value } = deceleration
        const paddedPropertyName =
            padPropertyNameWithMaxLength( property, maxPropertyLength, padSize )

        return paddedPropertyName + value + ';'
    }

//
// ─── FORMAT SINGLE VARIABLE DECELERATION ────────────────────────────────────────
//

    function formatSingleVariableDeceleration ( deceleration ) {
        const { property, value } = deceleration
        return property + ':\n    ' + value + ';'
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
        return selectors.sort( )
                        .join(', ')
    }

// ────────────────────────────────────────────────────────────────────────────────
