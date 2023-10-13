app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("Home", {
      url: "/home",
      templateUrl: "./templates/home.html",
      controller: "homeCtrl",
    })
    .state("Login", {
      url: "/login",
      templateUrl: "./templates/login.html",
      controller: "LoginCtrl",
    })
    .state("Signup", {
      url: "/signup",
      templateUrl: "./templates/signup.html",
      controller: "SignupCtrl",
    });
  $urlRouterProvider.otherwise("/home");
});
