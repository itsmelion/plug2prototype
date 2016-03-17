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

app.controller('MyController', function($scope, $mdSidenav) {
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
});
