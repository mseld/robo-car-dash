function MainController($scope, $http) {

    let system_url = "http://localhost:8080/system";
    let services_url = "http://localhost:8080/services";
    let bookmarks_url = "http://localhost:8080/bookmarks";

    $scope.system = {}
    $scope.services = [];
    $scope.bookmarks = [];

    $http.get(system_url).then(function(response) {
        $scope.system = response.data;
    });

    $http.get(services_url).then(function(response) {
        $scope.services = response.data;
    });

    $http.get(bookmarks_url).then(function(response) {
        $scope.bookmarks = response.data;
    });
}