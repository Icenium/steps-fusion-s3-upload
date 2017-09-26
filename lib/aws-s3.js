"use strict"

const fs = require("fs");
const url = require("url");
const AWS = require("aws-sdk");

class AwsS3 {
	constructor(storageConfiguration) {
		this.storageConfiguration = storageConfiguration;
	}

	upload(sourceFilePath, destinationUri, contentType) {
		this._updateConfig(this.storageConfiguration);
		const s3 = new AWS.S3();
		const sourceFile = fs.createReadStream(sourceFilePath);
		return new Promise((resolve, reject) => {
			sourceFile.on("error", (err) => {
				reject(err);
			});

			const requestData = this._objectRequestFromUri(destinationUri);
			requestData.Body = sourceFile;
			requestData.ContentType = contentType;
			requestData.StorageClass = this.storageConfiguration.resultsStorageClass;

			let s3upload = s3.upload;
			const isMultipartUpload = this.storageConfiguration.isMultipartUpload;
			if (!isMultipartUpload) {
				s3upload = s3.putObject;
				requestData.ContentLength = fs.statSync(sourceFilePath).size;
			}

			s3upload.apply(s3, [requestData, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}]);
		});
	}

	_objectRequestFromUri(uri) {
		const parsedUri = url.parse(uri),
			requestData = {
				Bucket: parsedUri.hostname,
				Key: unescape(parsedUri.pathname.substr(1)),
			};
		return requestData;
	}

	_updateConfig() {
		AWS.config.update(this.storageConfiguration);
	}
}

module.exports = AwsS3;
