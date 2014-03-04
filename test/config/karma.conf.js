/**
 * User: Daniel
 * Date: 13-5-29
 * Time: 上午9:28
 */

// base path, that will be used to resolve files and exclude
basePath = '../..';


// list of files / patterns to load in the browser
files = [
    JASMINE,
    JASMINE_ADAPTER,
    'app/js/lib/jquery/jquery-1.9.1.js',
    'app/js/lib/jquery/jquery-ui-1.10.2.custom.js',
    'app/js/lib/angular/angular.js',
    'app/js/lib/jquery-plugin/jquery.mousewheel.min.js',
    'app/js/lib/jquery-plugin/jquery.mCustomScrollbar.js',
    'app/js/lib/jquery-plugin/jquery-boostrap-pager.js',
    'app/js/lib/canvas-to-blob/canvas-to-blob.js',
    'app/js/lib/jquery-plugin/jquery-extension.js',
    'app/js/lib/tiny_mce/tiny_mce.js',
    'app/js/common/directive-ui.js',
    'app/js/common/service.js',
    'app/js/qam/services/qamService.js',
    'app/js/qam/controllers/appCtrl.js',
    'app/js/qam/controllers/passListCtrl.js',
    'app/js/qam/controllers/uncheckListCtrl.js',
    'app/js/qam/controllers/detailCtrl.js',
    'app/js/qam/controllers/tagsManageCtrl.js',
    'app/js/qam/app.js',
    'test/lib/angular/angular-mocks.js',
    'test/unit/**/*.js'
];


// list of files to exclude
exclude = [

];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['junit'];
junitReporter = {
    outputFile: 'test/reports/unit.xml'
};

// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;


// Add a Karma root to ensure that Karma’s source files don’t interfere with your tests
urlRoot = '/_karma_/';
