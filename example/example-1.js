const aegan = require("../dist/main");
const fs = require("fs");

const result = aegan(__dirname + "/example-1/main.js");

fs.writeFileSync("example/example-1/inlined-main.js", result);
