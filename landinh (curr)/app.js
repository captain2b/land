app = angular.module('myApp', ['yaMap', 'ngStorage']);
app.directive("scroll", function($window) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var offsetTop = element[0].offsetTop,
                offsetHeight = element[0].offsetHeight;

            checkScene();

            angular.element($window).bind("scroll", function() {
                checkScene();                     
            });

            function checkScene() {
                var bodyScrollTop = document.body.scrollTop;

                if (bodyScrollTop >= offsetTop
                    && bodyScrollTop <= offsetTop + offsetHeight) {
                    element.addClass('fadein');
                } else {
                    element.removeClass('fadein');
                }
            }
        }
    };
});
app.controller("HeaderController", function($scope, $location, $localStorage) {
    $scope.storage = $localStorage.$default({
        forms: []
    });

    $scope.Model = {
        name: null,
        email: null,
        phone: null,
        availableForms: 50 - $scope.storage.forms.length
    };

    $scope.isActive = function(path) {
        return path == $location.path();
    }

    $scope.submitForm = function(name, email, phone) {
        var formObject = {
            name: name,
            email: email,
            phone: phone
        };

        $scope.storage.forms.push(formObject);
        $scope.Model.availableForms = 50 - $scope.storage.forms.length;
        $scope.Model.name = null;
        $scope.Model.email = null;
        $scope.Model.phone = null;
    }
});
