
//
// Righteous - Kary Foundation Styled Code formatter
//     Copyright 2016 By Kary Foundation, Inc.
//     Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const ts = require('typescript');

//
// ─── INTERFACE ──────────────────────────────────────────────────────────────────
//

    module.exports = ( code ) => {

        //
        // ─── OPERATIONS ──────────────────────────────────────────────────
        //

            let options = getDefaultOptions( );

            // Parse the source text
            let sourceFile = ts.createSourceFile(
                "file.ts", code, ts.ScriptTarget.Latest, true) ;

            // Get the formatting edits on the input sources
            let edits = ts.formatting.formatDocument(
                sourceFile, getRuleProvider( options ), options );

            // Apply the edits on the input code
            let tsFinal = applyEdits( code, edits );

            return karyFixer( tsFinal );

        //
        // ─── FIXING WHAT TYPESCRIPT CAN NOT ──────────────────────────────
        //

            function karyFixer ( code ) {
                code = code.replace(
                    /function ([a-zA-Z0-9\_]+)\(/g,
                    ( match, functionName ) => `function ${ functionName } (`
                );
                code = code.replace( /\[(.)/g, ( match, char ) => `[ ${ char }` );
                code = code.replace( /(.)\]/g, ( match, char ) => `${ char } ]` );
                return code;
            }

        //
        // ─── GET RULE PROVIDE ────────────────────────────────────────────
        //

            function getRuleProvider ( options ) {
                // Share this between multiple formatters using the same options.
                // This represents the bulk of the space the formatter uses.
                let ruleProvider = new ts.formatting.RulesProvider( );
                ruleProvider.ensureUpToDate( options );
                return ruleProvider;
            }

        //
        // ─── APPLY EDITS ─────────────────────────────────────────────────
        //

            function applyEdits ( text, edits ) {
                // Apply edits in reverse on the existing text
                let result = text;
                for ( let i = edits.length - 1; i >= 0; i-- ) {
                    let change = edits[ i ];
                    let head = result.slice( 0, change.span.start );
                    let tail = result.slice( change.span.start + change.span.length );
                    result = head + change.newText + tail;
                }
                return result;
            }

        //
        // ─── GET DEFAULT OPTIONS ─────────────────────────────────────────
        //

            function getDefaultOptions ( ) {
                return {
                    IndentSize: 4,
                    TabSize: 4,
                    NewLineCharacter: '\r\n',
                    ConvertTabsToSpaces: true,
                    InsertSpaceAfterCommaDelimiter: true,
                    InsertSpaceAfterSemicolonInForStatements: true,
                    InsertSpaceBeforeAndAfterBinaryOperators: true,
                    InsertSpaceAfterKeywordsInControlFlowStatements: true,
                    InsertSpaceAfterFunctionKeywordForAnonymousFunctions: true,
                    InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: true,
                    PlaceOpenBraceOnNewLineForFunctions: false,
                    PlaceOpenBraceOnNewLineForControlBlocks: false,
                };
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
