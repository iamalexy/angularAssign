var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'VIEW/login.html',
                controller  : 'loginCtrl'
            })
            .when('/userList', {
                templateUrl : 'VIEW/viewUsers.html',
                controller  : 'listController'
            })
            // route for the about page
            .when('/createUser', {
                templateUrl : 'VIEW/createUser.html',
                controller  : 'createUserCtrl'
            })
			
    });
