/**
 * User: Daniel
 * Date: 13-5-29
 * Time: 下午2:17
 */

'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Test QAM', function() {

    beforeEach(function() {
        browser().navigateTo('/qam/index.html');
    });

    describe('Navigate to pass tab', function() {

        beforeEach(function() {
            browser().navigateTo('#!/pass');
        });

        it('search result by keyword:你好', function() {
            using('#tabs-pass form').input('queryParam.keyword').enter('你好');
            element('#tabs-pass form button').click();
        });

    });

    describe('Navigate to uncheck tab', function() {

        beforeEach(function() {
            browser().navigateTo('#!/uncheck');
        });

        it('Search result by keyword:你好', function() {
            using('#tabs-uncheck form').input('queryParam.keyword').enter('你好');
            element('#tabs-uncheck form button').click();
        });

    });
});
