"use strict";

const constants = require("./constants");
const UploadService = require("./upload-service");

class AndroidUploadService extends UploadService {
	constructor(utils, awsS3, projectPath, resultUrl, templateAppName, configuration) {
		super(utils, awsS3, projectPath, resultUrl, templateAppName);
		this.configuration = configuration;
	}

	_getUploadCandidates() {
		const apkFile = path.join("bin", `${this.templateAppName}-${this.configuration.toLowerCase()}.apk`);
		return [
			{
				relativePath: apkFile,
				targetSuffix: this.templateAppName + ".apk"
			},
			{
				relativePath: constants.DEFAULT_BUILD_RESULT_FILE_NAMES.ANDROID_MANIFEST,
				targetSuffix: constants.DEFAULT_BUILD_RESULT_FILE_NAMES.ANDROID_MANIFEST,
				disposition: constants.DISPOSITIONS.ADDITIONAL_FILE
			}
		];
	}
}

module.exports = AndroidUploadService;
