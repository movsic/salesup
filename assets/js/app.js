/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

'use strict';

angular.module('app', [
    'ui.router',
    'ui.utils',
    'ui.bootstrap',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ui.odometer',
    'angular-svg-round-progressbar'
]);
 
