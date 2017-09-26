"use strict";

const constants = require("./constants");
const UploadService = require("./upload-service");

class IosUploadService extends UploadService {

	constructor(utils, awsS3, projectPath, resultUrl, templateAppName) {
		super(utils, awsS3, projectPath, resultUrl, templateAppName);
	}

	_getUploadCandidates() {
		const result = [
			{ relativePath: constants.DEFAULT_BUILD_RESULT_FILE_NAMES.SIMULATOR },
			{ relativePath: constants.DEFAULT_BUILD_RESULT_FILE_NAMES.DEVICE },
			{
				relativePath: constants.INFO_PLIST,
				destinationFileName: constants.INFO_PLIST,
				disposition: constants.DISPOSITIONS.ADDITIONAL_FILE
			},
			{ relativePath: constants.NATIVE_PROJECT_ARCHIVE_NAME },
		];

		const otherDeviceBuildResult = `${this.templateAppName}.ipa`;
		if (otherDeviceBuildResult !== constants.DEFAULT_BUILD_RESULT_FILE_NAMES.DEVICE) {
			result.push({ relativePath: otherDeviceBuildResult });
		}

		const otherSimulatorBuildResult = `${this.templateAppName}.zip`;
		if (otherSimulatorBuildResult !== constants.DEFAULT_BUILD_RESULT_FILE_NAMES.SIMULATOR) {
			result.push({ relativePath: otherSimulatorBuildResult });
		}

		return result;
	}
}

module.exports = IosUploadService;
