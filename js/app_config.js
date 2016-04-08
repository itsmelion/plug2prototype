angular.module('PlugDawnbreak', ['ngMaterial'])
var app = angular.module('PlugDawnbreak', ['ngMaterial']);
app.config(function($mdThemingProvider) {

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

    $mdThemingProvider.theme('default')
          .primaryPalette('plug')
          .accentPalette('Success')
          .warnPalette('red')
          .backgroundPalette('grey');

    $mdThemingProvider.theme('plugPurple')
          .primaryPalette('deep-purple')
    $mdThemingProvider.theme('plugOrange')
          .primaryPalette('deep-orange')

});



// NEW MENU FEATURES

  app.controller('MyController', function ($scope, $timeout, $mdSidenav, $log, $mdDialog) {
      $scope.toggleLeft = buildDelayedToggler('left');
      $scope.toggleRight = buildToggler('right');
      $scope.toggleNotification = buildToggler('notificationbar');
      $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
      };
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
