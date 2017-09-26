"use strict";

module.exports = {
    DEFAULT_BUILD_RESULT_FILE_NAMES: {
        SIMULATOR: 'iphonesimulatorapp.zip',
        DEVICE: 'app.ipa',
        ANDROID_MANIFEST: "AndroidManifest.xml"
    },
    NATIVE_PROJECT_ARCHIVE_NAME: 'nativeProject.tar.gz',
    INFO_PLIST: 'Info.plist',
    DISPOSITIONS: {
        ADDITIONAL_FILE: 'AdditionalFile',
        BUILD_RESULT: 'BuildResult'
    },
    PLATFORMS: 'platforms',
    CONFIGURATION: {
        DEBUG: 'debug',
        RELEASE: 'release'
    }
};
