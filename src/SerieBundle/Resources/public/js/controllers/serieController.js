function serieController(tmdbService, $routeParams, $location) {

    this.tmdbService = tmdbService;
    this.$routeParams = $routeParams;
    this.$location = $location;

    this.underscoreReg = new RegExp('-', 'g');

    // fiche série
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

    // liste des acteurs
    this.getPeople = (id) => {
        this.tmdbService.people(id).then((response) => {
            this.people = response.data;
        });
    };

    this.getPeople($routeParams.id);

    // liste des saisons
    this.getSeasons = (id, season) => {
        this.tmdbService.seasons(id, season).then((response) => {
            this.seasons = response.data;
        });
    };

    // marquage des séries
    this.series = [];
    this.toggleFollow = (id) => {
        if (!this.series[id]) {
            this.series[id] = false;
        }
        this.series[id] = !this.series[id];
    };

    // marquage des séries
    this.episodeTrack = [];
    this.check = (id) => {
        if (!this.episodeTrack[id]) {
            this.episodeTrack[id] = false;
        }
        this.episodeTrack[id] = !this.episodeTrack[id];
        console.log(this.episodeTrack);
    };

    // barre de progression circulaire
    this.pourcentage = 75;
    this.circle = "c100 p" + this.pourcentage + " orange";

    // Barre de navigation saison
    // $('.horizon-swiper').horizonSwiper();

}
