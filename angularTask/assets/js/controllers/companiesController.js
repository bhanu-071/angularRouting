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
          if (response.data.status == true) {
            $scope.companyList = response.data.data;
          } else {
            Swal.fire("Oops!", response.data.message, "error");
          }
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
