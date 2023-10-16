app.controller("horizontalNavController", [
  "$scope",
  "$timeout",
  "$state",
  "$http",
  function ($scope, $timeout, $state, $http) {
    $scope.currentDate = new Date();
    $scope.welcomeMsg = "";
    var userId = localStorage.getItem("userId");
    $scope.removeToken = function () {
      $http({
        method: "POST",
        url: "./api/sessionout.php",
        data: { token: userId },
      })
        .then(
          function (response) {},
          function (reject) {
            Swal.fire("!Sorry", "Something error occur", "error");
          }
        )
        .catch(function (error) {
          Swal.fire("!Sorry", "Something went wrong", "error");
        });
    };
    $timeout(function () {
      localStorage.removeItem("userId");
      Swal.fire("Session Expired!", "Please login again", "success");
      $scope.removeToken();
      $state.go("login");
    }, 600000);
    $scope.logout = function () {
      localStorage.removeItem("userId");
      Swal.fire("Logout Successful", "", "success");
      $scope.removeToken();
      $state.go("login");
    };
    $http({ method: "POST", url: "./api/getuser.php", data: { token: userId } })
      .then(
        function (response) {
          $scope.welcomeMsg = response.data.data;
          $scope.userEmail = response.data.message;
        },
        function (reject) {
          Swal.fire("Oops!", response.data.message, "error");
        }
      )
      .catch(function (error) {
        Swal.fire("Sorry!", "Something went wrong", "error");
      });
  },
]);
