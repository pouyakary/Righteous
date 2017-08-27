

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
// ─── FORMATTERS BASED ON TYPE ───────────────────────────────────────────────────
//

    const formatters = {
        comment:    formatComment,
        media:      formatMedia,
        rule:       formatRule,
        page:       formatRule,
    }

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
        const formattedBodyRules = formatBodyOfRules( rules )
        return "\n" + formattedBodyRules.join('\n\n').trim( ) + "\n"
    }

//
// ─── FORMAT RULES BODY ──────────────────────────────────────────────────────────
//

    function formatBodyOfRules ( rules ) {
        const results = [ ]
        for ( const element of rules ) {
            const formatter = formatters[ element.type ]
            results.push( formatter( element ) )
        }
        return results
    }

//
// ─── FORMAT MEDIA ───────────────────────────────────────────────────────────────
//

    function formatMedia ( element ) {
        const { media, rules } = element

        const formattedBodyRules =
            formatBodyOfRules( rules )
        const formattedBodyString =
            indentCodeByOneLevel( formattedBodyRules.join('\n\n') )

        return "@media " + media + " {\n" + formattedBodyString + "\n}"
    }

//
// ─── FORMAT COMMENT ─────────────────────────────────────────────────────────────
//

    function formatComment ( element ) {
        const { comment } = element

        if ( !/\n/.test( comment ) )
            return '\n\n/* ' + comment.trim( ) + ' */';

        const newComment =
            comment .split('\n')
                    .map( line => " " + line.trim( ) )
                    .join('\n')

        return '/*' + newComment + '*/';
    }

//
// ─── SORT RULES ─────────────────────────────────────────────────────────────────
//

    function formatRule ( element ) {
        const { selectors, declarations, type } = element
        const formattedHeader =
            getRuleHeader( element )
        const { listOfProperties, listOfVariables } =
            filterVariablesAndProperties( declarations )

        const formattedVariables =
            formatVariables( listOfVariables )
        const formattedProperties =
            formatProperties( listOfProperties )

        const separator =
            (( formattedVariables.length > 0 && formattedProperties.length > 0 )
                ? [ " " ]
                : [ ] )

        const formattedDecelerations =
            [ ...formattedVariables, ...separator, ...formattedProperties ]
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

    function formatVariables ( listOfVariables ) {
        const results = [ ]
        const sortedVariables =
            sortDeclarationList( listOfVariables )

        for ( const variableDeceleration of sortedVariables )
            results.push(
                formatSingleVariableDeceleration( variableDeceleration ))

        return results
    }

//
// ─── FORMAT PROPERTIES ──────────────────────────────────────────────────────────
//

    function formatProperties ( listOfProperties ) {
        const results = [ ]
        const sortedProperties =
            sortDeclarationList( listOfProperties )
        const maxPropertyLength =
            getMaxPropertyNameLength( listOfProperties )
        const padSize =
            ( Math.ceil( ( maxPropertyLength + 1 ) / 4 ) + 1 ) * 4

        for ( const propertyDeceleration of sortedProperties )
            results.push(
                formatSinglePropertyDeceleration(
                    propertyDeceleration, maxPropertyLength, padSize ) )

        return results
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

    function getRuleHeader ( element ) {
        const { selectors, type } = element
        const selectorsFormatted =
            selectors.sort( ).join(', ')

        console.log( element )

        if ( type === 'page' )
            return '@page' + selectorsFormatted
        else
            return selectorsFormatted
    }

// ────────────────────────────────────────────────────────────────────────────────
