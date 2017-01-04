function searchController(tmdbService, $routeParams, $location) {

    this.$routeParams = $routeParams;
    this.tmdbService = tmdbService;
    this.$location = $location;

    console.log($routeParams);

    this.getSearch = (query) => {
        $location.path("/resultats/" + query);
        var page = 1;
        this.search = [];
        this.tmdbService.search(query, page).then((res) => {
            this.total_results = res.data.total_results;
            console.log(this.total_results);
            this.total_pages = res.data.total_pages;
            console.log(this.total_pages);
            if (this.total_pages == 1) {
                tmdbService.search(query, this.total_pages).then((res) => {
                    this.search = res.data.results;
                });
            } else {
                for (var page = 1; page <= this.total_pages; page++) {
                    tmdbService.search(query, page).then((res) => {
                        this.search = this.search.concat(res.data.results);
                    });
                }
            }
        });
    };

    this.getSearch($routeParams.query);

    this.tvShowView = (id) => {
        $location.path("/serie/" + id);
    };
}
