const chai = require("chai");
const aegean = require("../dist/main");
const fs = require("fs");
const expect = chai.expect;
const types = {
	null: null,
	undefined: undefined,
	"an integer": 42,
	"a function": function() {},
	"a date": new Date(),
	"a regular expression": new RegExp(),
	"a symbol": Symbol(),
	"a float": 42.14,
	"an object": new Object()
};

describe("aegean", function() {
	// Usage
	it("should inline one simple import statement", function() {
		const expected = fs
			.readFileSync(__dirname + "/sample/1/expected.js")
			.toString();
		const actual = aegean(__dirname + "/sample/1/main.js");

		expect(actual).to.equal(expected);
	});

	it("should inline files that contains import chain", function() {
		const expected = fs
			.readFileSync(__dirname + "/sample/2/expected.js")
			.toString();
		const actual = aegean(__dirname + "/sample/2/main.js");

		expect(actual).to.equal(expected);
	});

	// Exceptions
	it("should not throw an Error if the first parameter is a string", function() {
		expect(function() {
			aegean(__dirname + "/sample/1/main.js");
		}).to.not.throw(Error);
	});

	for (const key in types) {
		const value = types[key];

		it(`should throw an Error if the first parameter is ${key}`, function() {
			expect(function() {
				aegean(value);
			}).to.throw(Error);
		});

		it(`should throw an Error message if the first parameter is ${key}`, function() {
			expect(function() {
				aegean(value);
			}).to.throw("aegean expects parameter 1 to be a string");
		});
	}

	it("should throw an Error if the file does not exist", function() {
		expect(function() {
			aegean(__dirname + "/non-existing-file.js");
		}).to.throw(Error);
	});

	it("should throw an Error message if the file does not exist", function() {
		const path = __dirname + "/non-existing-file.js";

		expect(function() {
			aegean(path);
		}).to.throw(`file "${path}" does not exist`);
	});

	it("should throw an Error if the path does not target a file", function() {
		expect(function() {
			aegean(__dirname + "/sample");
		}).to.throw(Error);
	});

	it("should throw an Error message if the path does not target a file", function() {
		const path = __dirname + "/sample";

		expect(function() {
			aegean(path);
		}).to.throw(`path "${path}" should target a file`);
	});

	it("should throw an Error if the path inside a sub import file does not exist", function() {
		expect(function() {
			aegean(__dirname + "/sample/3/main.js");
		}).to.throw(Error);
	});

	it("should throw an Error message if the path inside a sub import file does not exist", function() {
		const path = __dirname + "/sample/3/is_string.js";

		expect(function() {
			aegean(__dirname + "/sample/3/main.js");
		}).to.throw(`file "${path}" does not exist`);
	});

	it("should throw an Error if the path inside a sub import file does not target a file", function() {
		expect(function() {
			aegean(__dirname + "/sample/4/main.js");
		}).to.throw(Error);
	});

	it("should throw an Error message if the path inside a sub import file does not target a file", function() {
		const path = __dirname + "/sample/4/folder.js";

		expect(function() {
			aegean(__dirname + "/sample/4/main.js");
		}).to.throw(`path "${path}" should target a file`);
	});

	// Bug fix
	// Multiples import in a single file cause the code of an import statement to overlap codes of others import statements.
	it("should not overlap the code when using multiples imports inside a single file", function() {
		expected = fs
			.readFileSync(__dirname + "/sample/5/expected.js")
			.toString();
		actual = aegean(__dirname + "/sample/5/main.js");

		expect(actual).to.equal(expected);
	});
});
