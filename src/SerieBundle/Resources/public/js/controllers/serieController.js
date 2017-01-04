function serieController(tmdbService, $routeParams, $location) {

    this.tmdbService = tmdbService;
    this.$routeParams = $routeParams;
    this.$location = $location;

    this.getSheetSerie = (id) => {
        this.tmdbService.sheetSerie(id).then((response) => {
            this.sheetSerie = response.data;
            console.log(response.data);
        });
        this.tmdbService.seasons(id, 1).then((response) => {
            this.seasons = response.data;
            console.log(this.seasons);

        });
    };

    this.getSheetSerie($routeParams.id);

    this.getPeople = (id) => {
        this.tmdbService.people(id).then((response) => {
            this.people = response.data;
        });
    };

    this.getPeople($routeParams.id);

    this.getSeasons = (id, season) => {
        this.tmdbService.seasons(id, season).then((response) => {
            this.seasons = response.data;
        });
    };


    this.episodeTrack = [];
    this.check = (id) => {
        if (!this.episodeTrack[id]) {
            this.episodeTrack[id] = false;
        }
        this.episodeTrack[id] = !this.episodeTrack[id];
        console.log(this.episodeTrack);
    };

    this.pourcentage = 50;
    this.circle = "c100 p" + this.pourcentage + " orange";



}
