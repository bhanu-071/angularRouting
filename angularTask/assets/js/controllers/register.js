app.controller("registerController", [
  "$scope",
  "$state",
  "$filter",
  "$http",
  function ($scope, $state, $filter, $http) {
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.selectedGender = "";
    $scope.dateOfBirth = "";
    $scope.phoneNumber = "";
    $scope.email = "";
    $scope.password = "";
    $scope.confirmPassword = "";
    var userId = localStorage.getItem("userId");
    if (userId) {
      $state.go("home");
    }
    $scope.validateFirstName = function () {
      $scope.firstNameError = "";
      $scope.firstName = $scope.firstName.trim();
      $scope.firstName = $scope.firstName.replace(/[^a-zA-Z]/g, "");
      if ($scope.firstName == "") {
        $scope.firstNameError = "First name can't be empty";
        return false;
      } else {
        return true;
      }
    };
    $scope.validateLastName = function () {
      $scope.lastNameError = "";
      $scope.lastName = $scope.lastName.trim();
      $scope.lastName = $scope.lastName.replace(/[^a-zA-Z]/g, "");
      if ($scope.lastName == "") {
        $scope.lastNameError = "Last name can't be empty";
        return false;
      } else {
        return true;
      }
    };
    $scope.validateGender = function () {
      $scope.genderError = "";
      if ($scope.selectedGender == "") {
        $scope.genderError = "Please select the gender";
        return false;
      } else {
        return true;
      }
    };
    $scope.validateDateOfBirth = function () {
      $scope.dateOfBirthError = "";
      var currentDate = new Date();
      var dateOfBirth = new Date($scope.dateOfBirth);
      if ($scope.dateOfBirth == "") {
        $scope.dateOfBirthError = "Please select date of birth";
        return false;
      } else if (dateOfBirth > currentDate) {
        $scope.dateOfBirthError = "Please select valid date of birth";
        return false;
      } else {
        return true;
      }
    };
    $scope.validatePhoneNumber = function () {
      $scope.phoneNumberError = "";
      if ($scope.phoneNumber != undefined) {
        $scope.phoneNumber = $scope.phoneNumber.trim();
        $scope.phoneNumber = $scope.phoneNumber.replace(/[^0-9]/g, "");
      }
      if ($scope.phoneNumber == "" || $scope.phoneNumber == undefined) {
        $scope.phoneNumberError = "Phone number can't be empty";
        return false;
      } else if ($scope.phoneNumber.match(/^[9876][0-9]*$/g) === null) {
        $scope.phoneNumberError = "Enter valid phone number";
        return false;
      } else if (
        $scope.phoneNumber.length > 10 ||
        $scope.phoneNumber.length < 10
      ) {
        $scope.phoneNumberError = "Phone number length should be 10";
        return false;
      } else {
        return true;
      }
    };
    $scope.validateEmail = function () {
      $scope.emailError = "";
      $scope.email = $scope.email.trim();
      $scope.email = $filter("lowercase")($scope.email);
      if ($scope.email == "") {
        $scope.emailError = "Email can't be empty";
        return false;
      } else if (
        $scope.email.match(/[a-z]+[0-9]*@[a-z]+\.(com|in)/g) === null
      ) {
        $scope.emailError = "Enter valid email";
        return false;
      } else {
        return true;
      }
    };
    $scope.validatePassword = function () {
      $scope.passwordError = "";
      $scope.password = $scope.password.trim();
      if ($scope.password == "") {
        $scope.passwordError = "Password can't be empty";
        return false;
      } else if ($scope.password.length < 8) {
        $scope.passwordError = "Password length should be atleast 8";
        return false;
      } else if ($scope.password.match(/[a-z]+[0-9]+[*&#@$%!^]/g) === null) {
        $scope.passwordError =
          "Password must contain number and special character";
        return false;
      }
      return true;
    };
    $scope.validateConfirmPassword = function () {
      $scope.confirmPasswordError = "";
      $scope.confirmPassword = $scope.confirmPassword.trim();
      if ($scope.confirmPassword == "") {
        $scope.confirmPasswordError = "Confirm password can't be empty";
        return false;
      } else if ($scope.confirmPassword != $scope.password) {
        $scope.confirmPasswordError = "Password doesn't match";
        return false;
      } else {
        return true;
      }
    };
    $scope.register = function () {
      var validateFirstName = $scope.validateFirstName();
      var validateLastName = $scope.validateLastName();
      var validateGender = $scope.validateGender();
      var validateDateOfBirth = $scope.validateDateOfBirth();
      var validatePhoneNumber = $scope.validatePhoneNumber();
      var validateEmail = $scope.validateEmail();
      var validatePassword = $scope.validatePassword();
      var validateConfirmPassword = $scope.validateConfirmPassword();
      var registrationObj = {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        gender: $scope.selectedGender,
        phoneNumber: $scope.phoneNumber,
        email: $scope.email,
        dateOfBirth: $scope.dateOfBirth,
        password: $scope.password,
      };
      if (
        validateFirstName &&
        validateLastName &&
        validateGender &&
        validatePhoneNumber &&
        validateDateOfBirth &&
        validateEmail &&
        validatePassword &&
        validateConfirmPassword
      ) {
        $http({
          method: "POST",
          url: "./api/register.php",
          data: registrationObj,
        })
          .then(
            function (response) {
              if (response.data.status == true) {
                Swal.fire(
                  "Registration Successful!",
                  "You can login now",
                  "success"
                );
                $state.go("login");
              } else {
                Swal.fire("Oops!", response.data.message, "error");
              }
            },
            function (reject) {
              Swal.fire("Sorry!", "some error occur", "error");
            }
          )
          .catch(function (error) {
            Swal.fire("Sorry!", "Something went wrong", "error");
          });
      }
    };
  },
]);
