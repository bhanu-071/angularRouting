app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "./templates/login.html",
        controller: "loginController",
      })
      .state("register", {
        url: "/register",
        templateUrl: "./templates/register.html",
        controller: "registerController",
      })
      .state("Home", {
        url: "/home",
        templateUrl: "./templates/home.html",
        controller: "homeController",
      })
      .state("Company details", {
        url: "/home/companies",
        templateUrl: "./templates/companies.html",
        controller: "companiesController",
      })
      .state("Employees details", {
        url: "/home/employees",
        templateUrl: "./templates/employees.html",
        controller: "employeesController",
      })
      .state("Salary details", {
        url: "/home/salaries",
        templateUrl: "./templates/salaries.html",
        controller: "salariesController",
      })
      .state("addSalary", {
        url: "/home/salaries/addSalary",
        templateUrl: "./templates/addSalary.html",
        controller: "addSalaryController",
      });
    $urlRouterProvider.otherwise("/login");
  },
]);
