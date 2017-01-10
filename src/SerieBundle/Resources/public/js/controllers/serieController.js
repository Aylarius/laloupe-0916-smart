function serieController(serieService, sessionFactory, tmdbService, $routeParams, $location, $rootScope) {

    this.tmdbService = tmdbService;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.serieService = serieService;
    this.sessionFactory = sessionFactory;

    this.underscoreReg = new RegExp('-', 'g');

    // fiche série
    this.getSheetSerie = (id) => {
        this.tmdbService.sheetSerie(id).then((response) => {
            this.sheetSerie = response.data;
            console.log(response.data.id);
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


    // marquage des épisodes
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


    this.follow = (id) => {
        this.serieService.follow({
            id: id,
            user_id: this.sessionFactory.user.id
        }).then((res) => {
            this.loginMessage = {};
        this.loginMessage.type = "success";
        this.loginMessage.title = "Vous avez bien ajouté cette série à vos séries favorites !";
        this.loginMessage.message = "En cours de redirection...";
        this.getFollow($routeParams.id, this.sessionFactory.user.id);
        this.$timeout(() => {
            this.loginMessage = null;
    }, 200);
    }).catch((res) => {
        this.loginMessage = {};
        this.loginMessage.type = "error";
        this.loginMessage.title = "Erreur lors du suivi";
        this.loginMessage.message = res.data;
        this.getFollow($routeParams.id, this.sessionFactory.user.id);
    });
    };

    this.getFollow = (id, data) => {
        this.serieService.doIFollow(id,data).then((res) => {
            this.series = res.data.followed;
    });
    };

    this.getFollow($routeParams.id, this.sessionFactory.user.id);

}
