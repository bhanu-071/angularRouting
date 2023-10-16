app.controller("addSalaryController", [
  "$http",
  "$scope",
  function ($http, $scope) {
    var userId = localStorage.getItem("userId");
    $http({
      method: "POST",
      url: "api/getsalarydetailsinsert.php",
      data: { token: userId },
    })
      .then(
        function (response) {
          var keys = Object.keys(response.data);
          $scope.companyNames = keys;
          //$scope.companyName = "";
          $scope.employeeName = "";
          $scope.noOfLeaves = "";
          $scope.overTime = "";
          $scope.salaryDate = "";
          //$scope.selectedEmployeeId == "";
          $scope.validateCompanyName = function () {
            $scope.companyNameErr = "";
            console.log($scope.companyName);
            if ($scope.companyName == undefined) {
              $scope.companyNameErr = "Please select companyName";
              return false;
            } else {
              $scope.employeeIds = [];
              for (let i of keys) {
                if ($scope.companyName == i) {
                  for (j of response.data[i]) {
                    $scope.employeeIds.push(j.id);
                  }
                  break;
                }
              }
              return true;
            }
          };
          $scope.validateEmployee = function () {
            $scope.employeeIdErr = "";
            if ($scope.selectedEmployeeId == undefined) {
              $scope.employeeIdErr = "Please select employee id";
              return false;
            } else {
              for (i of response.data[$scope.companyName]) {
                if ($scope.selectedEmployeeId == i.id) {
                  $scope.employeeName = i.employee_name;
                  $scope.employeeNameErr = "";
                  break;
                }
              }
              return true;
            }
          };
          $scope.validateEmployeeName = function () {
            $scope.employeeNameErr = "";
            if ($scope.employeeName == "") {
              $scope.employeeNameErr = "Employee name can't be empty";
              return false;
            }
            return true;
          };
          $scope.validateLeaves = function () {
            $scope.noOfLeavesErr = "";
            $scope.noOfLeaves = $scope.noOfLeaves.replace(/[^0-9]/g, "");
            if ($scope.noOfLeaves == "") {
              $scope.noOfLeavesErr = "Number of leaves can't be empty";
              return false;
            }
            return true;
          };
          $scope.validateOverTime = function () {
            $scope.overTimeErr = "";
            $scope.overTime = $scope.overTime.replace(/[^0-9]/g, "");
            if ($scope.overTime == "") {
              $scope.overTimeErr = "Overtime can't be empty.";
              return false;
            }
            return true;
          };
          $scope.validateSalaryDate = function () {
            var salaryDate = new Date($scope.salaryDate);
            var now = new Date();
            $scope.salaryDateErr = "";
            if ($scope.salaryDate == "") {
              $scope.salaryDateErr = "Please select salary date";
              return false;
            } else if (salaryDate > now) {
              $scope.salaryDateErr = "Please select valid salary date";
              return false;
            }
            return true;
          };
          $scope.add = function () {
            var validateCompanyName = $scope.validateCompanyName();
            var validateEmployee = $scope.validateEmployee();
            var validateEmployeeName = $scope.validateEmployeeName();
            var validateLeaves = $scope.validateLeaves();
            var validateOvertime = $scope.validateOverTime();
            var validateSalaryDate = $scope.validateSalaryDate();
            var addSalaryObj = {
              token: userId,
              companyName: $scope.companyName,
              employeeId: $scope.selectedEmployeeId,
              employeeName: $scope.employeeName,
              noOfLeaves: $scope.noOfLeaves,
              overtime: $scope.overTime,
              salaryDate: $scope.salaryDate,
            };
            if (
              validateCompanyName &&
              validateEmployee &&
              validateEmployeeName &&
              validateLeaves &&
              validateOvertime &&
              validateSalaryDate
            ) {
              $http({
                method: "POST",
                url: "./api/insertsalaries.php",
                data: addSalaryObj,
              })
                .then(
                  function (response) {
                    console.log(response);
                    Swal.fire("Good job!", response.data.message, "success");
                    $state.go("Salary details");
                  },
                  function (reject) {
                    Swal.fire("Sorry!", "Some error occur", "error");
                  }
                )
                .catch(function (error) {
                  Swal.fire("Sorry!", "Something went wrong", "error");
                });
            }
          };
        },
        function (reject) {
          Swal.fire("Sorry!", "Some error occur", "error");
        }
      )
      .catch(function () {
        Swal.fire("Sorry!", "Something went wrong", "error");
      });
  },
]);
