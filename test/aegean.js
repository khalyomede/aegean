import { expect } from "chai";
import aegean from "../lib/main";
import fs from "fs";
import pt from "path";
const types = {
	null: null,
	undefined: undefined,
	"an integer": 42,
	"a function": () => {},
	"a date": new Date(),
	"a regular expression": new RegExp(),
	"a symbol": Symbol(),
	"a float": 42.14,
	"an object": new Object(),
};

describe("aegean", () => {
	// Usage
	it("should inline one simple import statement", () => {
		const expected = fs
			.readFileSync(__dirname + "/sample/1/expected.js")
			.toString();
		const actual = aegean(__dirname + "/sample/1/main.js");

		expect(actual).to.equal(expected);
	});

	it("should inline files that contains import chain", () => {
		const expected = fs
			.readFileSync(__dirname + "/sample/2/expected.js")
			.toString();
		const actual = aegean(__dirname + "/sample/2/main.js");

		expect(actual).to.equal(expected);
	});

	it("should ignore other type of import method like default import", () => {
		const expected = fs
			.readFileSync(__dirname + "/sample/5/expected.js")
			.toString();
		const actual = aegean(__dirname + "/sample/5/main.js");

		expect(actual).to.equal(expected);
	});

	// Exceptions
	it("should not throw an Error if the first parameter is a string", () => {
		expect(() => {
			aegean(__dirname + "/sample/1/main.js");
		}).to.not.throw(Error);
	});

	for (const key in types) {
		const value = types[key];

		it(`should throw an Error if the first parameter is ${key}`, () => {
			expect(() => {
				aegean(value);
			}).to.throw(Error);
		});

		it(`should throw an Error message if the first parameter is ${key}`, () => {
			expect(() => {
				aegean(value);
			}).to.throw("aegean expects parameter 1 to be a string");
		});
	}

	it("should throw an Error if the file does not exist", () => {
		expect(() => {
			aegean(__dirname + "/non-existing-file.js");
		}).to.throw(Error);
	});

	it("should throw an Error message if the file does not exist", () => {
		const path = __dirname + "/non-existing-file.js";

		expect(() => {
			aegean(path);
		}).to.throw(`file "${path}" does not exist`);
	});

	it("should throw an Error if the path does not target a file", () => {
		expect(() => {
			aegean(__dirname + "/sample");
		}).to.throw(Error);
	});

	it("should throw an Error message if the path does not target a file", () => {
		const path = __dirname + "/sample";

		expect(() => {
			aegean(path);
		}).to.throw(`path "${path}" should target a file`);
	});

	it("should throw an Error if the path inside a sub import file does not exist", () => {
		expect(() => {
			aegean(__dirname + "/sample/3/main.js");
		}).to.throw(Error);
	});

	it("should throw an Error message if the path inside a sub import file does not exist", () => {
		const path = __dirname + "/sample/3/is_string.js";

		expect(() => {
			aegean(__dirname + "/sample/3/main.js");
		}).to.throw(`file "${pt.resolve(__dirname, path)}" does not exist`);
	});

	// Bug fix
	// Multiples import in a single file cause the code of an import statement to overlap codes of others import statements.
	it("should not overlap the code when using multiples imports inside a single file", () => {
		const expected = fs
			.readFileSync(__dirname + "/sample/4/expected.js")
			.toString();
		const actual = aegean(__dirname + "/sample/4/main.js");

		expect(actual).to.equal(expected);
	});

	it("should import modules from node modules with a relative path", () => {
		const expected = fs
			.readFileSync(__dirname + "/../node_modules/arr-union/index.js")
			.toString();
		const actual = aegean(__dirname + "/sample/6/main.js");

		expect(actual).to.be.equal(expected);
	});

	it("should throw an Error if the module path does not exists", () => {
		expect(() => {
			aegean(__dirname + "/sample/7/main.js");
		}).to.throw(Error);
	});

	it("should throw an Error message if the module path does not exists", () => {
		expect(() => {
			aegean(__dirname + "/sample/7/main.js");
		}).to.throw("Cannot find module 'khalyomede/index'");
	});

	it("should be able to import from multiple source types, including Typescript", () => {
		const expected = fs
			.readFileSync(__dirname + "/sample/8/expected.js")
			.toString();
		const actual = aegean(__dirname + "/sample/8/main.ts");

		expect(actual).to.be.equal(expected);
	});
});
