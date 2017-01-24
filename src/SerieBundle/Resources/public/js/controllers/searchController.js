function searchController(tmdbService, $routeParams, $location) {

    this.$routeParams = $routeParams;
    this.tmdbService = tmdbService;
    this.$location = $location;

    this.newSearch = (query) => {
        if (query != '') {
            $location.path("/resultats/" + query);
        }
    };

    this.getSearch = (query) => {
        var page = 1;
        this.search = [];
        this.tmdbService.search(query, page).then((res) => {
            this.total_pages = res.data.total_pages;
            for (var page = 1; page <= this.total_pages; page++) {
                tmdbService.search(query, page).then((res) => {
                    this.search = this.search.concat(res.data.results);
                });
            }
        });
    };

    this.getSearch($routeParams.query);

    this.getSearchByTag = () => {
        this.tmdbService.getTag().then((res) => {
            this.searchByTag = res.data.genres;
        });
    };

    this.getSearchByTag();

    this.comparTag = (id) => {
        this.tagActive = [];
        this.filterTag = id;
            if (this.tagActive.indexOf(id) === -1) {
                this.tagActive.push(id);
            } else {
                this.tagActive.splice(this.tagActive.indexOf(id), 1);
            }
        console.log(this.active);
    };

    this.comparTag();

    this.tvShowView = (id) => {
        $location.path("/serie/" + id);
    };

    this.tags = false;
    this.filter = () => {
      this.tags = !this.tags;
    }

}
