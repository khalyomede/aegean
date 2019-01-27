import { readFileSync, lstatSync, existsSync } from "fs";
import { dirname, resolve } from "path";
import * as babylon from "babylon";

/**
 * Include imports statements down to the importing file.
 *
 * @param {String} path The path to the file to inline.
 * @return {String} The inlined content.
 * @throws {Error} If the first parameter is not a string.
 * @throws {Error} If the path target a non existing file.
 * @throws {Error} If the path does not target a file.
 */
function aegean(path: string): string {
	if (path === null || path === undefined || path.constructor !== String) {
		throw new Error("aegean expects parameter 1 to be a string");
	}

	if (existsSync(path) === false) {
		throw new Error(`file "${path}" does not exist`);
	}

	const stat = lstatSync(path);

	if (stat.isFile() === false) {
		throw new Error(`path "${path}" should target a file`);
	}

	const content = readFileSync(path).toString();

	let result = inline(content, path);

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
function inline(content: string, path: string): string {
	let result = content;

	const ast = babylon.parse(content, {
		allowImportExportEverywhere: true
	});

	const statements = ast.program.body;

	let gap = 0;

	for (const statement of statements) {
		if (statement.type === "ImportDeclaration") {
			if (statement.specifiers.length === 0) {
				const regexpLocalFile = /^\.\//;
				let subPath = "";

				if (regexpLocalFile.test(statement.source.value)) {
					subPath =
						dirname(path) +
						"/" +
						statement.source.value +
						(statement.source.value.endsWith(".js") ? "" : ".js");
				} else {
					subPath = require.resolve(statement.source.value);
				}

				if (existsSync(subPath) === false) {
					throw new Error(
						`file "${resolve(__dirname, subPath)}" does not exist`
					);
				}

				const stat = lstatSync(subPath);

				if (stat.isFile() === false) {
					throw new Error(`path "${subPath}" should target a file`);
				}

				const subContent = readFileSync(subPath).toString();

				const subResult = inline(subContent, subPath);

				result =
					result.substring(0, statement.start + gap) +
					subResult +
					result.substring(statement.end + gap);

				gap += subResult.length - (statement.end - statement.start);
			}
		}
	}

	return result;
}

export = aegean;
