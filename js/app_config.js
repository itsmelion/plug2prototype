angular.module('PlugDawnbreak', ['ngMaterial'])
var app = angular.module('PlugDawnbreak', ['ngMaterial']);
app.config(function($mdThemingProvider) {
  var LIGHT_FOREGROUND = {
    name: 'light',
    '1': 'rgba(255,255,255,1.0)',
    '2': 'rgba(255,255,255,0.7)',
    '3': 'rgba(255,255,255,0.3)',
    '4': 'rgba(255,255,255,0.12)'
  };
    //create yr own palette
    $mdThemingProvider.definePalette('plug', {
        '50': 'E0F7FA',   // #E0F7FA
        '100': 'B2EBF2',  // #B2EBF2
        '200': '80DEEA',  // #80DEEA
        '300': '81D4FA',  // #81D4FA
        '400': '4FC3F7',  // #4FC3F7
        '500': '29B6F6',  // #29B6F6
        '600': '03A9F4',  // #03A9F4
        '700': '039BE5',  // #039BE5
        '800': '0288D1',  // #0288D1
        '900': '0277BD',  // #0277BD
        'A100': 'B2EBF2', // #B2EBF2
        'A200': '80DEEA', // #80DEEA
        'A400': '4DD0E1', // #4DD0E1
        'A700': '00BCD4', // #00BCD4
        'contrastDefaultColor': 'light',    // whether, by default, text(contrast) on this palette should be dark or light
        'contrastDarkColors': ['50', '100','A100'], //hues which contrast should be 'dark' by default
        'contrastLightColors': 'light'    // could also specify this if default was 'dark'

    });

    $mdThemingProvider.definePalette('Success', {
        '50': 'E0F2F1',  // #E0F2F1
        '100':'B2DFDB',  // #B2DFDB
        '200':'80CBC4',  // #80CBC4
        '300':'4DB6AC',  // #4DB6AC
        '400':'26A69A',  // #26A69A
        '500':'009688',  // #009688
        '600':'00897B',  // #00897B
        '700':'00796B',  // #00796B
        '800':'00695C',  // #00695C
        '900':'004D40',  // #004D40
        'A100':'B2DFDB', // #B2DFDB
        'A200':'80CBC4', // #80CBC4
        'A400':'4DB6AC', // #4DB6AC
        'A700':'009688', // #009688
        'contrastDefaultColor': 'light',    // whether, by default, text(contrast) on this palette should be dark or light
        'contrastDarkColors': ['50', '100' , 'A100' ], //hues which contrast should be 'dark' by default
        'contrastLightColors': 'light'    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.definePalette('Blank', {
        '50': 'E0E0E0',
        '100': 'E0E0E0',
        '200': 'FFFFFF',
        '300': 'FFFFFF',
        '400': 'FFFFFF',
        '500': 'FFFFFF',
        '600': 'FAFAFA',
        '700': 'FAFAFA',
        '800': 'F7F7F7',
        '900': 'F7F7F7',
        'A100': 'FAFAFA',
        'A200': 'FAFAFA',
        'A400': 'F1F1F1',
        'A700': 'FFFFFF',
        'contrastDefaultColor': 'light' // could also specify this if default was 'dark'

    });

    $mdThemingProvider.theme('default')
          .primaryPalette('plug')
          .accentPalette('Success')
          .warnPalette('red')
          .backgroundPalette('grey')


    $mdThemingProvider.theme('plugPurple')
          .primaryPalette('deep-purple')
    $mdThemingProvider.theme('plugOrange')
          .primaryPalette('deep-orange')
    $mdThemingProvider.theme('plugBlank')
          .primaryPalette('Blank')
          .accentPalette('Blank')
          .warnPalette('red')
          .backgroundPalette('Blank')
});



// NEW MENU FEATURES

  app.controller('MyController', function ($scope, $timeout, $mdSidenav, $log, $mdDialog) {
      $scope.toggleLeft = buildDelayedToggler('left');
      $scope.toggleRight = buildToggler('right');
      $scope.toggleNotification = buildToggler('notificationbar');
      $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
      };

      /**
           * Supplies a function that will continue to operate until the
           * time is up.
           */
          function debounce(func, wait, context) {
            var timer;
            return function debounced() {
              var context = $scope,
                  args = Array.prototype.slice.call(arguments);
              $timeout.cancel(timer);
              timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
              }, wait || 10);
            };
          }
          /**
           * Build handler to open/close a SideNav; when animation finishes
           * report completion in console
           */
          function buildDelayedToggler(navID) {
            return debounce(function() {
              $mdSidenav(navID)
                .toggle()
                .then(function () {
                  $log.debug("toggle " + navID + " is done");
                });
            }, 200);
          }
          function buildToggler(navID) {
            return function() {
              $mdSidenav(navID)
                .toggle()
                .then(function () {
                  $log.debug("toggle " + navID + " is done");
                });
            }
          }
        })
        app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
          $scope.close = function () {
            $mdSidenav('left').close()
              .then(function () {
                $log.debug("close LEFT is done");
              });
          };
        })
        app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
          $scope.close = function () {
            $mdSidenav('right').close()
              .then(function () {
                $log.debug("close RIGHT is done");
              });
          };
        });


// BOTTOM SHEET
        app.controller('PtM', function($scope, $timeout, $mdBottomSheet, $mdToast) {
          $scope.showGridBottomSheet = function() {
            $scope.alert = '';
            $mdBottomSheet.show({
              templateUrl: 'bottom-sheet-grid-template.html',
              disableParentScroll: false,
              clickOutsideToClose: true,
              disableBackdrop: true
            }).then(function(clickedItem) {
              $mdToast.show(
                    $mdToast.simple()
                      .textContent(clickedItem['name'] + ' clicked!')
                      .position('top right')
                      .hideDelay(1500)
                  );
            });
          };
        })

      app.controller('ModalCtrl', function($scope, $mdDialog, $mdMedia) {
        $scope.openConfirmModal = function() {
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Are you sure dude?')
              .textContent('You are suposed to think twice before complete this action')
              .ariaLabel('crazyModal')
              .ok('Of course i want, that is why i clicked it beforehand, fool!')

          );
        };
        $scope.openAvaliacaoModal = function() {
            $mdDialog.show({
              templateUrl: 'avaliacao.tmpl.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true
            })
        };
        $scope.openCampaignModal = function() {
          $mdDialog.show({
            templateUrl: 'campanha.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
          })
        };
        $scope.openFontModal = function() {
          $mdDialog.show({
            templateUrl: 'fonte.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
          })
        };
        $scope.openProductModal = function() {
          $mdDialog.show({
            templateUrl: 'produto.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
          })
        };
        $scope.openBulkNegociacaoModal = function() {
          $mdDialog.show({
            templateUrl: 'bulkNegociacao.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
          })
        };
        $scope.openMassTaskModal = function() {
          $mdDialog.show({
            templateUrl: 'massTask.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
          })
        };
      $scope.openColumnModal = function() {
        $mdDialog.show({
          templateUrl: 'colunas.tmpl.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true
        })
      };
      })

    // Visao Favorita TOAST
    .controller('ToastCtrl', function($scope, $mdToast) {
  var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
  $scope.toastPosition = angular.extend({},last);
  $scope.getToastPosition = function() {
    sanitizePosition();
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };
  function sanitizePosition() {
    var current = $scope.toastPosition;
    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;
    last = angular.extend({},current);
  }
      $scope.showActionToast = function() {
          var pinTo = $scope.getToastPosition();
          var toast = $mdToast.simple()
            .textContent('Ok, Salvei sua visao Favorita!')
            .action('UNDO')
            .highlightAction(true)
            .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
            .position(pinTo);
          $mdToast.show(toast).then(function(response) {
            if ( response == 'ok' ) {
              alert('You clicked the \'UNDO\' action.');
            }
          });
        };
      })
