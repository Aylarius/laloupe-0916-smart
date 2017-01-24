function serieController(serieService, episodeService, sessionFactory, tmdbService, $routeParams, $location, $rootScope, $timeout) {

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
    this.getFollow = (id, data) => {
        this.serieService.doIFollow(id, data).then((res) => {
            this.loader = true;
            this.series = res.data.followed;
            this.seasonDefault = 1;
            this.pourcentage = 0;
            this.circle = "c100 p" + this.pourcentage + " orange";
            if (this.series === false) {
                this.getSheetSerie = (id) => {
                    this.tmdbService.sheetSerie(id).then((response) => {
                        this.sheetSerie = response.data;
                        $timeout(function() {
                            $('.horizon-swiper').horizonSwiper();
                        }, 0);
                    });
                    this.tmdbService.seasons(id, this.seasonDefault).then((response) => {
                        this.seasons = response.data;
                        $timeout(() => {
                            this.loader = false;
                        }, 1500);
                    });
                };
            } else {
                this.getSheetSerie = (id) => {
                    this.tmdbService.sheetSerie(id).then((response) => {
                        this.sheetSerie = response.data;
                        $timeout(function() {
                            $('.horizon-swiper').horizonSwiper();
                        }, 0);
                    });
                    this.episodeService.getLastWatched($routeParams.id, this.sessionFactory.user.id).then((res) => {
                        this.lastWatched = res.data;
                        this.seasonDefault = !this.lastWatched.saison ? this.seasonDefault : this.lastWatched.saison;
                        this.tmdbService.seasons(id, this.seasonDefault).then((response) => {
                            this.seasons = response.data;
                            $timeout(() => {
                                this.loader = false;
                            }, 1500);
                        });
                    });
                };
            }

            this.getSheetSerie($routeParams.id);
        });
    };

    this.getFollow($routeParams.id, this.sessionFactory.user.id);

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


    // liste des acteurs
    this.getPeople = (id) => {
        this.tmdbService.people(id).then((response) => {
            this.people = response.data;
        });
    };

    this.getPeople($routeParams.id);

    // liste des saisons
    this.getSeasons = (id, season) => {
        this.loader = true;
        this.tmdbService.seasons(id, season).then((response) => {
            this.seasons = response.data;
            $timeout(() => {
                this.loader = false;
            }, 1500);
        });
    };

    // selection de la saison
    this.activeSeason = (id) => {
      angular.element('.seasonSelect').removeClass('seasonActive');
      angular.element('#season-' + id).addClass('seasonActive');
    };

    this.follow = (id, name, duration) => {
        this.serieService.follow({
            id: id,
            name: name,
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

    this.watchAll = (id, serieId, date, numero, saison) => {
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
        }).catch((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "error";
            this.loginMessage.title = "Erreur lors du suivi";
            this.loginMessage.message = res.data;
        });
    };



    this.watchSeason = (id) => {
        this.tmdbService.seasons($routeParams.id, id).then((response) => {
            this.season = response.data;
            console.log(this.season);
            this.episodeService.getAllWatchedBySeason($routeParams.id, this.sessionFactory.user.id, this.season.season_number).then((res) => {
                this.serieTrack = res.data;
                console.log(this.serieTrack);
                for (let episode of this.season.episodes) {
                    if (this.serieTrack.indexOf(episode.id) == -1) {
                        this.watchAll(episode.id, $routeParams.id, episode.air_date, episode.episode_number, episode.season_number);
                    }
                }
                this.getAllWatched($routeParams.id, this.sessionFactory.user.id);
            });
        });
    };
    this.unwatchSeason = (id) => {
        this.tmdbService.seasons($routeParams.id, id).then((response) => {
            this.season = response.data;
            console.log(this.season);
            this.episodeService.getAllWatchedBySeason($routeParams.id, this.sessionFactory.user.id, this.season.season_number).then((res) => {
                this.serieTrack = res.data;
                console.log(this.serieTrack);
                for (let episode of this.season.episodes) {
                    if (this.serieTrack.indexOf(episode.id) !== -1) {
                        this.watchAll(episode.id, $routeParams.id, episode.air_date, episode.episode_number, episode.season_number);
                    }
                }
                this.getAllWatched($routeParams.id, this.sessionFactory.user.id);
            });
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
                    if (this.lastWatched === "") {
                        this.exist = false;
                    } else {
                        this.exist = true;
                        this.tmdbService.lastEpisode(this.lastWatched.serieId.serieId, this.lastWatched.saison, this.lastWatched.numero).then((response) => {
                            this.episode = response.data;
                        });
                    }
                });
            });

        });

    };
    this.getAllWatched($routeParams.id, this.sessionFactory.user.id);

    this.getLastWatched = (id, user) => {
        this.episodeService.getLastWatched(id, user).then((res) => {
            this.lastWatched = res.data;
            this.tmdbService.lastEpisode(this.lastWatched.serieId.serieId, this.lastWatched.saison, this.lastWatched.numero).then((response) => {
                this.episode = response.data;
                console.log(this.episode);
            });
        });
    };




    // $(".seasonSelect").one("click", function() {
    //     $(this).css("color", "orange");
    // });

    // $('.seasonSelect').on('click',
    //     '.onsale-filter',
    //     function() {
    //         $('.highlighted').removeClass('highlighted');
    //         $('.vacation').filter('.onsale').addClass('highlighted');
    //     });

}
