app.controller("companiesController", [
  "$http",
  "$scope",
  function ($http, $scope) {
    var userId = localStorage.getItem("userId");
    $http({
      method: "POST",
      url: "./api/getcompanies.php",
      data: { token: userId },
    })
      .then(
        function (response) {
          $scope.companyList = response.data;
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
