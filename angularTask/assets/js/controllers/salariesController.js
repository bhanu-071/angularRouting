app.controller("salariesController", [
  "$http",
  "$scope",
  "$state",
  function ($http, $scope, $state) {
    $scope.salary_per_month = "";
    $scope.overtime_pay = "";
    $scope.leaves_deduction = "";
    $scope.basic_pay = "";
    $scope.allowances = "";
    $scope.performance_bonus = "";
    $scope.benifits = "";
    $scope.income_tax = "";
    $scope.insurances = "";
    $scope.provident_fund = "";
    $scope.employee_name = "";
    $scope.company_name = "";
    $scope.salary_date = "";
    var userId = localStorage.getItem("userId");
    function getData() {
      $http({
        method: "POST",
        url: "./api/getsalarydetails.php",
        data: { token: userId },
      })
        .then(
          function (response) {
            console.log(response);
            if (response.data.status == true) {
              $scope.salaryList = response.data.data;
            } else {
              console.log(response);
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
    }
    getData();
    $scope.salaryDetail = function (index) {
      $http({
        method: "post",
        url: "./api/getviewsalaries.php",
        data: { id: index },
      })
        .then(
          function (response) {
            if (response.data.status == true) {
              console.log(response.data.data[0].salary_per_month);
              $scope.salary_per_month = response.data.data[0].salary_per_month;
              $scope.overtime_pay = response.data.data[0].overtime_pay;
              $scope.leaves_deduction = response.data.data[0].leaves_deduction;
              $scope.basic_pay = response.data.data[0].basic_pay;
              $scope.allowances = response.data.data[0].allowances;
              $scope.performance_bonus =
                response.data.data[0].performance_bonus;
              $scope.benifits = response.data.data[0].benifits;
              $scope.income_tax = response.data.data[0].income_tax;
              $scope.insurances = response.data.data[0].insurances;
              $scope.provident_fund = response.data.data[0].provident_fund;
              $scope.employee_name = response.data.data[0].employee_name;
              $scope.company_name = response.data.data[0].company_name;
              $scope.salary_date = response.data.data[0].salary_date;
            } else if (response.data.status == false) {
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
    };
    $scope.printSalaryInvoice = function () {
      window.print();
    };
    $scope.deleteSalary = function () {
      var checkIds = [];
      $scope.salaryList.filter((each) => {
        if (each.checked == true) {
          checkIds.push(each.id);
        }
      });
      $http({
        method: "POST",
        url: "./api/deletesalaries.php",
        data: { checkIds: checkIds },
      })
        .then(
          function (response) {
            console.log(response);
            if (response.data.status == true) {
              Swal.fire("Done!", response.data.message, "success");
              getData();
            } else {
              Swal.fire("Oops!", response.data.message, "error");
            }
          },
          function (reject) {
            Swal.fire("Sorry!", "Some error occur", "error");
          }
        )
        .catch(function (error) {
          console.log(error);
          Swal.fire("Sorry!", "Something went wrong", "error");
        });
    };
  },
]);
