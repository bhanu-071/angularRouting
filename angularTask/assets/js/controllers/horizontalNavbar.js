app.controller("horizontalNavController", [
  "$scope",
  "$timeout",
  "$state",
  "$http",
  function ($scope, $timeout, $state, $http) {
    $scope.currentDate = new Date();
    $scope.welcomeMsg = "";
    $scope.flag = "";
    var userId = localStorage.getItem("userId");
    $scope.removeToken = async function () {
      $scope.flag = false;
      await $http({
        method: "POST",
        url: "./api/sessionout.php",
        data: { token: userId },
      })
        .then(
          function (response) {
            console.log(response);
            if (response.data.status == false) {
              Swal.fire("!Sorry", response.data.message, "error");
            } else {
              $scope.flag = true;
              console.log($scope.flag);
            }
          },
          function (reject) {
            Swal.fire("!Sorry", "Something error occur", "error");
          }
        )
        .catch(function (error) {
          Swal.fire("!Sorry", "Something went wrong", "error");
        });
      return $scope.flag;
    };
    $timeout(function () {
      if ($scope.removeToken()) {
        localStorage.removeItem("userId");
        Swal.fire("Session Expired!", "Please login again", "success");
        $state.go("login");
      }
    }, 600000);
    $scope.logout = function () {
      console.log($scope.removeToken());
      if ($scope.removeToken()) {
        localStorage.removeItem("userId");
        Swal.fire("Logout Successful", "", "success");
        $state.go("login");
      }
    };
    $http({ method: "POST", url: "./api/getuser.php", data: { token: userId } })
      .then(
        function (response) {
          console.log(response);
          if (response.data.status == true) {
            $scope.welcomeMsg = response.data.data;
            $scope.userEmail = response.data.message;
          } else {
            Swal.fire("Oops!", response.data.message, "error");
          }
        },
        function (reject) {
          Swal.fire("Oops!", "Some error occur", "error");
        }
      )
      .catch(function (error) {
        Swal.fire("Sorry!", "Something went wrong", "error");
      });
  },
]);
