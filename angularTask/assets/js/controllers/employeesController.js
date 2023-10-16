app.controller("employeesController", [
  "$http",
  "$scope",
  function ($http, $scope) {
    var userId = localStorage.getItem("userId");
    $http({
      method: "POST",
      url: "./api/getemployees.php",
      data: { token: userId },
    })
      .then(
        function (response) {
          $scope.employeeList = response.data;
        },
        function (reject) {
          Swal.fire("Sorry!", "Some error occur", "error");
        }
      )
      .catch(function (error) {
        Swal.fire("Sorry!", "Something went wrong", "error");
      });
  },
]);
