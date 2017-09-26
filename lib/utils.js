"use strict";

const fs = require("fs");

class Utils {
	writeOutput(uploadResults, filePath) {
		filePath = filePath || "/Users/dragonadminov/work/result.josn";
		return fs.writeFileSync(filePath, JSON.stringify(uploadResults), { encoding: "utf8" });
	}
}

module.exports = Utils;
