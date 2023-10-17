app.controller("loginController", [
  "$scope",
  "$filter",
  "$http",
  "$state",
  function ($scope, $filter, $http, $state) {
    $scope.email = "";
    $scope.password = "";
    var userId = localStorage.getItem("userId");
    if (userId) {
      $state.go("Home");
    }
    $scope.validateEmail = function () {
      $scope.emailError = "";
      console.log($scope.email);
      if ($scope.email != "") {
        $scope.email = $scope.email.trim();
        $scope.email = $filter("lowercase")($scope.email);
      }
      if ($scope.email == "") {
        $scope.emailError = "Email can't be empty";
        return false;
      } else if ($scope.email.match(/[a-z]+[0-9]*@[a-z]+\.(com|in)/g) == null) {
        $scope.error = "Invalid email or password";
        return false;
      }
      return true;
    };
    $scope.validatePassword = function () {
      $scope.passwordError = "";
      if ($scope.password == "") {
        $scope.passwordError = "Password can't be empty";
        return false;
      } else if ($scope.password.length < 8) {
        $scope.error = "Invalid email or password";
        return false;
      } else if ($scope.password.match(/[a-z]+[0-9]+[*&#@$%!^]/g) === null) {
        $scope.error = "Invalid email or password";
        return false;
      }
      return true;
    };
    $scope.login = function () {
      $scope.error = "";
      var validatePassword = $scope.validatePassword();
      var validateEmail = $scope.validateEmail();
      if ($scope.passwordError != "" || $scope.emailError != "") {
        $scope.error = "";
      } else if (validateEmail && validatePassword) {
        var loginObj = { email: $scope.email, password: $scope.password };
        $http({ method: "POST", url: "./api/login.php", data: loginObj })
          .then(
            function (response) {
              if (response.data.status == true) {
                console.log(response.data.data);
                localStorage.setItem("userId", response.data.data);
                $state.go("Home");
              } else {
                Swal.fire("Oops!", response.data.message, "error");
              }
            },
            function (reject) {
              Swal.fire("Oops!", "some error occur", "error");
            }
          )
          .catch(function (error) {
            Swal.fire("Oops!", "Something went wrong", "error");
          });
      }
    };
  },
]);
