/**
 * Include imports statements down to the importing file.
 *
 * @param {String} path The path to the file to inline.
 * @return {String} The inlined content.
 * @throws {Error} If the first parameter is not a string.
 * @throws {Error} If the path target a non existing file.
 * @throws {Error} If the path does not target a file.
 */
declare function aegean(path: string): string;
export = aegean;
