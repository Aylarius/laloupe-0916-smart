function serieController(serieService, episodeService, sessionFactory, tmdbService, $routeParams, $location, $rootScope) {

    this.tmdbService = tmdbService;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.serieService = serieService;
    this.episodeService = episodeService;
    this.sessionFactory = sessionFactory;
    console.log(this.sessionFactory.isLogged);
    this.underscoreReg = new RegExp('-', 'g');

    // fiche série

    this.seasonDefault = 1;
    if (this.sessionFactory.isLogged === false) {
        this.getSheetSerie = (id) => {
            this.tmdbService.sheetSerie(id).then((response) => {
                this.sheetSerie = response.data;
            });
            this.tmdbService.seasons(id, this.seasonDefault).then((response) => {
                this.seasons = response.data;
            });
        };
    } else {
        this.getSheetSerie = (id) => {
            this.tmdbService.sheetSerie(id).then((response) => {
                this.sheetSerie = response.data;
            });
            this.episodeService.getLastWatched($routeParams.id, this.sessionFactory.user.id).then((res) => {
                this.lastWatched = res.data;
                this.seasonDefault = this.lastWatched.saison;
                this.tmdbService.seasons(id, this.seasonDefault).then((response) => {
                    this.seasons = response.data;
                });
            });
        };
    }

    this.modalToConnexion = () => {
        $('.modal-backdrop').remove();
        $('.modal-open').removeClass('modal-open');
        $('body').css({
            paddingRight: 0
        });
        this.$location.path('/connexion');
    };

    this.modalToInscription = () => {
        $('.modal-backdrop').remove();
        $('.modal-open').removeClass('modal-open');
        $('body').css({
            paddingRight: 0
        });
        this.$location.path('/inscription');
    };

    this.okSpoiler = [];
    this.modalSpoiler = (id) => {
        if (!this.okSpoiler[id]) {
            this.okSpoiler[id] = false;
        }
        this.okSpoiler[id] = !this.okSpoiler[id];
        console.log(this.okSpoiler);
    };


    console.log(this.sessionFactory.series);

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


    this.follow = (id, duration) => {
        this.serieService.follow({
            id: id,
            duration: duration,
            user_id: this.sessionFactory.user.id
        }).then((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "success";
            this.loginMessage.title = "Vous avez bien ajouté cette série à vos séries favorites !";
            this.loginMessage.message = "En cours de redirection...";
            this.getFollow($routeParams.id, this.sessionFactory.user.id);
        }).catch((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "error";
            this.loginMessage.title = "Erreur lors du suivi";
            this.loginMessage.message = res.data;
            this.getFollow($routeParams.id, this.sessionFactory.user.id);
        });
    };

    this.getFollow = (id, data) => {
        this.serieService.doIFollow(id, data).then((res) => {
            this.series = res.data.followed;
        });
    };

    this.getFollow($routeParams.id, this.sessionFactory.user.id);

    this.watch = (id, serieId, date, numero, saison) => {
        this.episodeService.watch({
            episode_id: id,
            serie_id: serieId,
            date: date,
            numero: numero,
            saison: saison,
            user_id: this.sessionFactory.user.id
        }).then((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "success";
            this.loginMessage.title = "Vous avez bien ajouté cette série à vos séries favorites !";
            this.loginMessage.message = "En cours de redirection...";
            this.getAllWatched($routeParams.id, this.sessionFactory.user.id);
            this.getLastWatched($routeParams.id, this.sessionFactory.user.id);
        }).catch((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "error";
            this.loginMessage.title = "Erreur lors du suivi";
            this.loginMessage.message = res.data;
            this.getAllWatched($routeParams.id, this.sessionFactory.user.id);
            this.getLastWatched($routeParams.id, this.sessionFactory.user.id);
        });
    };


    this.serieTrack = [];

    this.getAllWatched = (id, user) => {
        this.episodeService.getAllWatched(id, user).then((res) => {
            this.serieTrack = res.data;
            this.tmdbService.sheetSerie($routeParams.id).then((response) => {
                this.sheetSerie = response.data;
                // barre de progression circulaire
                this.pourcentage = Math.round((this.serieTrack.length * 100) / this.sheetSerie.number_of_episodes);
                this.circle = "c100 p" + this.pourcentage + " orange";

                this.episodeService.getLastWatched(id, user).then((res) => {
                    this.lastWatched = res.data;
                    this.tmdbService.lastEpisode(this.lastWatched.serieId.serieId, this.lastWatched.saison, this.lastWatched.numero).then((response) => {
                        this.episode = response.data;
                        console.log(this.episode);
                    });
                });
            });

        });

    };
    this.getAllWatched($routeParams.id, this.sessionFactory.user.id);

    // this.getLastWatched = (id, user) => {
    //     this.episodeService.getLastWatched(id, user).then((res) => {
    //         this.lastWatched = res.data;
    //         this.tmdbService.lastEpisode(this.lastWatched.serieId.serieId, this.lastWatched.saison, this.lastWatched.numero).then((response) => {
    //             this.episode = response.data;
    //             console.log(this.episode);
    //         });
    //     });
    // };
    // this.getLastWatched($routeParams.id, this.sessionFactory.user.id);


}
