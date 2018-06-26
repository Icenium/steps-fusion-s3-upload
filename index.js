"use strict";

const path = require("path");
const { argv } = require("yargs");
const Utils = require("./lib/utils");
const AwsS3 = require("./lib/aws-s3");
const IosUploadService = require("./lib/ios-upload-service");
const AndroidUploadService = require("./lib/android-upload-service");

const jsonArgv = new Buffer(argv._[0], "base64").toString("utf8");
const request = JSON.parse(jsonArgv);
const projectPath = argv._[1];
const awsS3 = new AwsS3(request.storageConfiguration);
const utils = new Utils();
const uploadService = request.args.platform.toLowerCase() === "android" ?
	new AndroidUploadService(utils, awsS3, projectPath, request.resultsUri, request.args.templateAppName, request.args.buildConfiguration, path) :
	new IosUploadService(utils, awsS3, projectPath, request.resultsUri, request.args.templateAppName);

uploadService.upload()
	.then((files) => utils.writeOutput(files, request.resultFilePath));
