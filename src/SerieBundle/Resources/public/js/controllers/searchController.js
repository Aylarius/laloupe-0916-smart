function searchController(tmdbService, $routeParams, $location) {

    this.$routeParams = $routeParams;
    this.tmdbService = tmdbService;
    this.$location = $location;

    console.log($routeParams);

    this.getSearch = (query) => {
        $location.path("/resultats/" + query);
        this.tmdbService.search(query).then((response) => {
            this.search = response.data;
            console.log(response.data);
        });
    };

    this.getSearch($routeParams.query);

}
