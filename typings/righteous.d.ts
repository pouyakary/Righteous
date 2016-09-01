
declare module "righteous-core" {
    /**
     * Formatts a JavaScript / TypeScript code into
     * **Kary Foundation's** Standard Coding Style.
     */
    function format(code: string): string;
    export = format;
}