const fs = require("fs");
const aegean = require("../dist/main");

const result = aegean(__dirname + "/example-2/main.js");

fs.writeFileSync(__dirname + "/example-2/inlined-main.js", result);
