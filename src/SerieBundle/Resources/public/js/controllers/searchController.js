function searchController(tmdbService, $routeParams) {

    this.$routeParams = $routeParams;
    this.tmdbService = tmdbService;

    this.getSearch = (query) => {
        this.tmdbService.search(query).then((response) => {
            this.search = response.data;
            console.log(response.data);
        });
    };

    this.getSearch($routeParams.query);

}
