"use strict";
var fs_1 = require("fs");
var path_1 = require("path");
var babylon = require("babylon");
/**
 * Include imports statements down to the importing file.
 *
 * @param {String} path The path to the file to inline.
 * @return {String} The inlined content.
 * @throws {Error} If the first parameter is not a string.
 * @throws {Error} If the path target a non existing file.
 * @throws {Error} If the path does not target a file.
 */
function aegean(path) {
    if (path === null || path === undefined || path.constructor !== String) {
        throw new Error("aegean expects parameter 1 to be a string");
    }
    if (fs_1.existsSync(path) === false) {
        throw new Error("file \"" + path + "\" does not exist");
    }
    var stat = fs_1.lstatSync(path);
    if (stat.isFile() === false) {
        throw new Error("path \"" + path + "\" should target a file");
    }
    var content = fs_1.readFileSync(path).toString();
    var result = inline(content, path);
    return result;
}
/**
 * Traverse a content and import recursively all the import statement contents into the content.
 *
 * @param {String} content The file that could contain import statement.
 * @param {String} path The path to the file.
 * @return {String} The content with potential inlined import statements.
 * @throws {Error} If one of the sub import files target a non existing file in their imports.
 * @throws {Error} If one of the sub import files does not target a file.
 */
function inline(content, path) {
    var result = content;
    var ast = babylon.parse(content, {
        allowImportExportEverywhere: true
    });
    var statements = ast.program.body;
    var gap = 0;
    for (var _i = 0, statements_1 = statements; _i < statements_1.length; _i++) {
        var statement = statements_1[_i];
        if (statement.type === "ImportDeclaration") {
            var subPath = path_1.dirname(path) +
                "/" +
                statement.source.value +
                (statement.source.value.endsWith(".js") ? "" : ".js");
            if (fs_1.existsSync(subPath) === false) {
                throw new Error("file \"" + subPath + "\" does not exist");
            }
            var stat = fs_1.lstatSync(subPath);
            if (stat.isFile() === false) {
                throw new Error("path \"" + subPath + "\" should target a file");
            }
            var subContent = fs_1.readFileSync(subPath).toString();
            var subResult = inline(subContent, subPath);
            result =
                result.substring(0, statement.start + gap) +
                    subResult +
                    result.substring(statement.end + gap);
            gap += subResult.length - (statement.end - statement.start);
        }
    }
    return result;
}
module.exports = aegean;
