/* ============================================================
 * File: config.lazyload.js
 * Configure modules for ocLazyLoader. These are grouped by 
 * vendor libraries. 
 * ============================================================ */

angular.module('app')
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: [{
                    name: 'nvd3',
                    files: [
                        'bower_components/d3/d3.min.js',
                        'bower_components/nvd3/build/nv.d3.min.js',
                        'bower_components/nvd3/build/nv.d3.min.css',
                        'bower_components/angular-nvd3/dist/angular-nvd3.min.js',
                        //'assets/plugins/nvd3/src/utils.js',
                        //'assets/plugins/nvd3/src/tooltip.js',
                        //'assets/plugins/nvd3/src/interactiveLayer.js',
                        //'assets/plugins/nvd3/src/models/axis.js',
                        //'assets/plugins/nvd3/src/models/line.js',
                        //'assets/plugins/nvd3/src/models/lineWithFocusChart.js',
                    ],
                    serie: true // load in the exact order
                }, {
                    name: 'metrojs',
                    files: [
                        'bower_components/metrojs/release/MetroJs.Full/MetroJs.min.js',
                        'bower_components/metrojs/release/MetroJs.Full/MetroJs.min.css'
                    ]
                }, {
                    name: 'isotope',
                    files: [
                        'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
                        'bower_components/isotope/dist/isotope.pkgd.min.js'
                    ]
                }, {
                    name: 'codropsDialogFx',
                    files: [
                        'bower_components/dialogfx/js/dialogFx.js',
                        'bower_components/dialogfx/css/dialog.css',
                        'bower_components/dialogfx/css/dialog-sandra.css'
                    ]
                }, {
                    name: 'noUiSlider',
                    files: [
                        'assets/plugins/jquery-nouislider/jquery.nouislider.min.js',
                        'assets/plugins/jquery-nouislider/jquery.liblink.js',
                        'assets/plugins/jquery-nouislider/jquery.nouislider.css'
                    ]
                }, {
                    name: 'moment',
                    files: [
                        'assets/plugins/moment/moment.min.js',
                        'assets/plugins/moment/moment-with-locales.min.js',
                        'bower_components/moment/locale/ru.js',
                        //'bower_components/moment/min/moment.min.js',
                        //'bower_components/moment/min/moment-with-locales.min.js',
                        //'bower_components/angular-moment/angular-moment.js',
                    ]
                }, {
                    //https://github.com/angular-ui/ui-select
                    name: 'select',
                    files: [
                        'assets/plugins/bootstrap-select2/select2.css',
                        'assets/plugins/angular-ui-select/select.min.css',
                        'assets/plugins/angular-ui-select/pages-select2-old.css',
                        'assets/plugins/angular-ui-select/select.min.js'
                    ]
                }, {
                    name: 'datepicker',
                    files: [
                        'assets/plugins/bootstrap-datepicker/css/datepicker3.css',
                        'assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                    ]
                }, 
//------------------------------------------------------------------------------------------------------

                {
                    name: 'owlCarousel',
                    files: [
                        'assets/plugins/owl-carousel/owl.carousel.js',
                        //'assets/plugins/angular-owl-carousel/angular-owl-carousel.js',
                        'assets/plugins/owl-carousel/assets/owl.carousel.css'
                    ]
                }, {
                    name: 'rickshaw',
                    files: [
                        'assets/plugins/nvd3/lib/d3.v3.js',
                        'assets/plugins/rickshaw/rickshaw.min.js',
                        'assets/plugins/angular-rickshaw/rickshaw.js',
                        'assets/plugins/rickshaw/rickshaw.min.css',
                    ],
                    serie: true
                }, {
                    name: 'sparkline',
                    files: [
                    'assets/plugins/jquery-sparkline/jquery.sparkline.min.js',
                    'assets/plugins/angular-sparkline/angular-sparkline.js'
                    ]
                }, {
                    name: 'mapplic',
                    files: [
                        'assets/plugins/mapplic/js/hammer.js',
                        'assets/plugins/mapplic/js/jquery.mousewheel.js',
                        'assets/plugins/mapplic/js/mapplic.js',
                        'assets/plugins/mapplic/css/mapplic.css'
                    ]
                }, {
                    name: 'skycons',
                    files: ['assets/plugins/skycons/skycons.js']
                }, {
                    name: 'switchery',
                    files: [
                        'assets/plugins/switchery/js/switchery.min.js',
                        'assets/plugins/ng-switchery/ng-switchery.js',
                        'assets/plugins/switchery/css/switchery.min.css',
                    ]
                }, {
                    name: 'menuclipper',
                    files: [
                        'assets/plugins/jquery-menuclipper/jquery.menuclipper.css',
                        'assets/plugins/jquery-menuclipper/jquery.menuclipper.js'
                    ]
                }, {
                    name: 'wysihtml5',
                    files: [
                        'assets/plugins/bootstrap3-wysihtml5/bootstrap3-wysihtml5.min.css',
                        'assets/plugins/bootstrap3-wysihtml5/bootstrap3-wysihtml5.all.min.js'
                    ]
                }, {
                    name: 'stepsForm',
                    files: [
                        'assets/plugins/codrops-stepsform/css/component.css',
                        'assets/plugins/codrops-stepsform/js/stepsForm.js'
                    ]
                }, {
                    name: 'jquery-ui',
                    files: ['assets/plugins/jquery-ui-touch/jquery.ui.touch-punch.min.js']
                }, {
                    name: 'moment-locales',
                    files: ['assets/plugins/moment/moment-with-locales.min.js'
                    ]
                }, {
                    name: 'hammer',
                    files: ['assets/plugins/hammer.min.js']
                }, {
                    name: 'sieve',
                    files: ['assets/plugins/jquery.sieve.min.js']
                }, {
                    name: 'line-icons',
                    files: ['assets/plugins/simple-line-icons/simple-line-icons.css']
                }, {
                    name: 'ionRangeSlider',
                    files: [
                        'assets/plugins/ion-slider/css/ion.rangeSlider.css',
                        'assets/plugins/ion-slider/css/ion.rangeSlider.skinFlat.css',
                        'assets/plugins/ion-slider/js/ion.rangeSlider.min.js'
                    ]
                }, {
                    name: 'navTree',
                    files: [
                        'assets/plugins/angular-bootstrap-nav-tree/abn_tree_directive.js',
                        'assets/plugins/angular-bootstrap-nav-tree/abn_tree.css'
                    ]
                }, {
                    name: 'angularBootstrap',
                    files: [
                        'assets/plugins/angular-animate/angular-animate.js',
                        'assets/plugins/angular-bootstrap/ui-bootstrap-tpls.min.js'
                    ]
                }, {
                    name: 'nestable',
                    files: [
                        'assets/plugins/jquery-nestable/jquery.nestable.css',
                        'assets/plugins/jquery-nestable/jquery.nestable.js',
                        'assets/plugins/angular-nestable/angular-nestable.js'
                    ]
                }, {
                    name: 'daterangepicker',
                    files: [
                        'assets/plugins/moment/moment.min.js',
                        'assets/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                        'assets/plugins/bootstrap-daterangepicker/daterangepicker.js',
                        'assets/plugins/angular-daterangepicker/angular-daterangepicker.min.js'
                    ],
                    serie: true
                }, {
                    name: 'timepicker',
                    files: [
                        'assets/plugins/bootstrap-timepicker/bootstrap-timepicker.min.css',
                        'assets/plugins/bootstrap-timepicker/bootstrap-timepicker.min.js'
                    ]
                }, {
                    name: 'inputMask',
                    files: [
                        'assets/plugins/jquery-inputmask/jquery.inputmask.min.js'
                    ]
                }, {
                    name: 'autonumeric',
                    files: [
                        'assets/plugins/jquery-autonumeric/autoNumeric.js'
                    ]
                }, {
                    name: 'summernote',
                    files: [
                        'assets/plugins/summernote/css/summernote.css',
                        'assets/plugins/summernote/js/summernote.min.js',
                        'assets/plugins/angular-summernote/angular-summernote.min.js'
                    ],
                    serie: true // load in the exact order
                }, {
                    name: 'tagsInput',
                    files: [
                        'assets/plugins/bootstrap-tag/bootstrap-tagsinput.css',
                        'assets/plugins/bootstrap-tag/bootstrap-tagsinput.min.js'
                    ]
                }, {
                    name: 'dropzone',
                    files: [
                        'assets/plugins/dropzone/css/dropzone.css',
                        'assets/plugins/dropzone/dropzone.min.js',
                        'assets/plugins/angular-dropzone/angular-dropzone.js'
                    ],
                    serie: true
                }, {
                    name: 'wizard',
                    files: [
                        'assets/plugins/lodash/lodash.min.js',
                        'assets/plugins/angular-wizard/angular-wizard.min.css',
                        'assets/plugins/angular-wizard/angular-wizard.min.js'
                    ]
                }, {
                    name: 'dataTables',
                    files: [
                        'assets/plugins/jquery-datatable/media/css/dataTables.bootstrap.min.css',
                        'assets/plugins/jquery-datatable/extensions/FixedColumns/css/dataTables.fixedColumns.min.css',
                        'assets/plugins/datatables-responsive/css/datatables.responsive.css',
                        'assets/plugins/jquery-datatable/media/js/jquery.dataTables.min.js',
                        'assets/plugins/jquery-datatable/extensions/TableTools/js/dataTables.tableTools.min.js',
                        'assets/plugins/jquery-datatable/media/js/dataTables.bootstrap.js',
                        'assets/plugins/jquery-datatable/extensions/Bootstrap/jquery-datatable-bootstrap.js',
                        'assets/plugins/datatables-responsive/js/datatables.responsive.js',
                        'assets/plugins/datatables-responsive/js/lodash.min.js'
                    ],
                    serie: true // load in the exact order
                }, {
                    name: 'google-map',
                    files: [
                        'assets/plugins/angular-google-map-loader/google-map-loader.js',
                        'assets/plugins/angular-google-map-loader/google-maps.js'
                    ]
                },  {
                    name: 'interact',
                    files: [
                        'assets/plugins/interactjs/interact.min.js'
                    ]
                }, {
                    name: 'tabcollapse',
                    files: [
                        'assets/plugins/bootstrap-collapse/bootstrap-tabcollapse.js'
                    ]
                },  {
                    name: 'ui-grid',
                    files: [
                        'assets/plugins/angular-ui-grid/ui-grid.min.css',
                        'assets/plugins/angular-ui-grid/ui-grid.min.js']

                },{
                    name: 'typehead',
                    files: [
                        'assets/plugins/bootstrap-typehead/typeahead.bundle.min.js',
                        'assets/plugins/bootstrap-typehead/typeahead.jquery.min.js',
                        'assets/plugins/bootstrap-typehead/bloodhound.min.js',
                        'assets/plugins/angular-typehead/angular-typeahead.min.js'
                    ]
                }

            ]
        });
    }]);
