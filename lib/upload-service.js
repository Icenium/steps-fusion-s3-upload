"use strict";

const constants = require("./constants");
const path = require("path");
const fs = require("fs");
const Q = require("q");
const url = require("url")

class UploadService {
	constructor(utils, awsS3, projectPath, resultUrl, templateAppName) {
		this.utils = utils;
		this.awsS3 = awsS3;
		this.projectPath = projectPath;
		this.resultsUri = resultUrl;
		this.templateAppName = templateAppName;
		this.files = [];
	}

	upload() {
		const uploadCandidates = this._getUploadCandidates();
		const resultsBaseUri = this.resultsUri;
		const uploads = [];
		uploadCandidates.forEach(upload =>
			this._uploadIfExists(upload.relativePath, upload.destinationFileName, upload.disposition, uploads));

		return Q.all(uploads)
		.then(() => this.files);
	}

	_uploadIfExists(relativePath, resultPath, disposition, uploads) {
		const filePath = path.join(this.projectPath, relativePath);
		if (fs.existsSync(filePath)) {
			let uploadUri = url.resolve(this.resultsUri, resultPath || relativePath);
			uploads.push(this._uploadBuildResult(filePath, uploadUri, disposition));
		}
	};

	_uploadBuildResult(resultFilePath, resultFileUri, files, disposition, password) {
		return this.awsS3.upload(resultFilePath, resultFileUri)
			.then(() => {
				this.files.push({
					sourceUri: resultFileUri,
					disposition: disposition || constants.DISPOSITIONS.BUILD_RESULT,
					password: password || ""
				});
			});
	}
}

module.exports = UploadService;
