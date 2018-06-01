
//
// Righteous 2018-present By Pouya Kary <pouya@kary.us>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const css = require( 'css' )

//
// ─── REGULAR EXPRESSIONS ────────────────────────────────────────────────────────
//

    const KARY_SECTION_COMMENT_DETECTOR =
        /─{3} (?:(?:[ 0-9a-zA-Z ]|\s))* ─*/g

    const KARY_LINE_COMMENT_DETECTOR =
        /^-+$/

//
// ─── FORMATTERS BASED ON TYPE ───────────────────────────────────────────────────
//

    const formatters = {
        comment:    formatComment,
        media:      formatMedia,
        rule:       formatRule,
        page:       formatRule,
        import:     formatImport,
    }

//
// ─── GLOBALS ────────────────────────────────────────────────────────────────────
//

    var previousBlockWasComment =
        false

    var insideKarySectionComment =
        false

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

        const formattedBodyRules =
            formatBodyOfRules( rules )

        const noTrillingWhitespaceBodyString =
            formattedBodyRules  .join( '\n\n' )
                                .split( '\n' )
                                .map( line => line.trimRight( ) )
                                .join( '\n' )
                                .replace( /;\n\n@import/g, ";\n@import" )
                                .trim( )

        return "\n" + noTrillingWhitespaceBodyString + "\n"
    }

//
// ─── FORMAT RULES BODY ──────────────────────────────────────────────────────────
//

    function formatBodyOfRules ( rules ) {
        const results = [ ]
        for ( const element of rules ) {
            const formatter =
                formatters[ element.type ]
            const formattedElement =
                formatter( element )
            const karyIndentedElement =
                checkAndApplyIndentationForKaryComments( element.type, formattedElement )
            results.push(
                karyIndentedElement
            )
        }
        return results
    }

//
// ─── CHECK AND APPLY FOR KARY COMMENTS ──────────────────────────────────────────
//

    function checkAndApplyIndentationForKaryComments ( elementType, formattedElement ) {
        if ( elementType !== "comment" && insideKarySectionComment )
            return indentCodeByOneLevel( formattedElement )
        else
            return formattedElement
    }


//
// ─── FORMAT IMPORT ──────────────────────────────────────────────────────────────
//

    function formatImport ( element ) {
        return "@import " + element.import + ";"
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

        if ( KARY_SECTION_COMMENT_DETECTOR.test( comment ) )
            insideKarySectionComment = true
        if ( KARY_LINE_COMMENT_DETECTOR.test( comment ) )
            insideKarySectionComment = false

        // if ( !/\n/.test( comment ) )
        //     return '\n\n/* ' + comment.trim( ) + ' */';

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
        previousBlockWasComment = true

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

        function isTheNextDeclarationVariable ( startingIndex ) {
            for ( let index = startingIndex; index < declarations.length; index++ ) {
                const deceleration =
                    declarations[ index ]
                if ( deceleration.type === "declaration" )
                    return deceleration.property.startsWith( '--' )
            }
        }

        for ( let index = 0; index < declarations.length; index++ ) {
            const deceleration = declarations[ index ]
            if ( deceleration.type === "comment" ) {
                // We're checking a comment and comments depend
                // on their next objects.
                if ( index >= deceleration.length ) {
                    listOfProperties.push( deceleration )
                } else {
                    if ( isTheNextDeclarationVariable( index ) ) {
                        listOfVariables.push( deceleration )
                    } else {
                        listOfProperties.push( deceleration )
                    }
                }
            } else {
                // We're checking a normal declaration:
                if ( deceleration.property.startsWith( '--' ) ) {
                    listOfVariables.push( deceleration )
                } else {
                    listOfProperties.push( deceleration )
                }
            }
        }

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
        const maxPropertyLength =
            getMaxPropertyNameLength( listOfProperties )
        const padSize =
            ( Math.ceil( ( maxPropertyLength + 1 ) / 4 ) + 1 ) * 4

        for ( const propertyDeceleration of listOfProperties )
            results.push(
                formatSinglePropertyDeceleration(
                    propertyDeceleration, padSize ) )

        return results
    }

//
// ─── SORT PROPERTIES ────────────────────────────────────────────────────────────
//

    function sortProperties ( listOfProperties ) {
        const properties = { }
        listOfProperties.forEach( x =>
            properties[ x.property ] = x )
        return listOfProperties
            .map( x => x.property )
            .sort( )
            .map( key => properties[ key ] )
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
            declarations
                .filter( declaration => declaration.type === "declaration" )
                .map( deceleration => deceleration.property.length )

        return Math.max( ...propertyLengths )
    }

//
// ─── FORMAT SINGLE DECLARATION ──────────────────────────────────────────────────
//

    function formatSinglePropertyDeceleration ( deceleration, padSize ) {
        if ( deceleration.type === "comment" )
            return formatInlineComment( deceleration )

        const { property, value } = deceleration
        const paddedPropertyName =
            ( property + ":" ).padEnd( padSize )

        previousBlockWasComment = false
        return paddedPropertyName + value + ';'
    }

//
// ─── FORMAT INLINE COMMENT ──────────────────────────────────────────────────────
//

    function formatInlineComment ( declaration ) {
        const commentText =
            declaration.comment.trim( )

        if ( previousBlockWasComment ) {
            previousBlockWasComment = true
            return "/* " + commentText + " */"
        } else {
            previousBlockWasComment = true
            return "\n/* " + commentText + " */"
        }
    }

//
// ─── FORMAT SINGLE VARIABLE DECELERATION ────────────────────────────────────────
//

    function formatSingleVariableDeceleration ( deceleration ) {
        if ( deceleration.type === "comment" )
            return formatInlineComment( deceleration )

        const { property, value } = deceleration

        previousBlockWasComment = false
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

        if ( type === 'page' )
            return '@page' + selectorsFormatted
        else
            return selectorsFormatted
    }

// ────────────────────────────────────────────────────────────────────────────────
