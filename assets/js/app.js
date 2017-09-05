/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

'use strict';

angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'angularMoment',
    'ngOdometer',
    'ui.utils'
]);

//    'ui.utils',    'ui.odometer'
 
