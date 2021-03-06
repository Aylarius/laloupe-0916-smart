function register2Controller(serieService, userService, sessionFactory, $timeout, $routeParams, $location, $rootScope, tmdbService) {

    this.userService = userService;
    this.serieService = serieService;
    this.sessionFactory = sessionFactory;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.tmdbService = tmdbService;
    this.$timeout = $timeout;

    if (this.sessionFactory.isLogged === true){
      this.loggedin = true;
    }

    this.getSerieRegister = () => {
        this.tmdbService.popular().then((response) => {
            this.results = response.data.results.slice(0, 9);
            this.resultsMore = response.data.results.slice(10, 19);
        });
    };

    this.getSerieRegister();

    this.isToggled = false;
    this.toggleMoreInsc = () => {
        this.isToggled = !this.isToggled;
    };

    // marquage des séries
    this.serieTrack = [];
    this.check = (id) => {
        if (this.serieTrack.indexOf(id) === -1) {
            this.serieTrack.push(id);
        } else {
            this.serieTrack.splice(this.serieTrack.indexOf(id), 1);
        }
    };


    this.followInsc = (id) => {
        this.serieService.followInsc(id).then((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "success";
            this.loginMessage.title = "Vous avez bien ajouté ces séris à vos favoris !";
            this.loginMessage.message = "En cours de redirection...";
            this.sessionFactory.isLogged = true;
            this.$rootScope.$emit('loginStatusChanged', true);
            $rootScope.$emit('loginStatusChangedNavbar');
            $rootScope.$emit('loginStatusChangedHomepage');
            this.$timeout(() => {
                this.loginMessage = null;
                this.$location.path('/');
            }, 200);
        }).catch((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "error";
            this.loginMessage.title = "Erreur lors de l'inscription";
            this.loginMessage.message = res.data;
        });
    };


    this.follow = (id) => {
        if (this.serieTrack.indexOf(id) === -1) {
            this.serieTrack.push(id);
        } else {
            this.serieTrack.splice(this.serieTrack.indexOf(id), 1);
        }
        this.tmdbService.sheetSerie(id).then((response) => {
            this.sheetSerie = response.data;

        this.serieService.follow({
            id: id,
            name: this.sheetSerie.name,
            duration: this.sheetSerie.episode_run_time[0],
            user_id: this.sessionFactory.user.id
        }).then((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "success";
            this.loginMessage.title = "Vous avez bien ajouté cette série à vos séries favorites !";
        this.$timeout(() => {
            this.loginMessage = null;
    }, 1000);
    }).catch((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "error";
            this.loginMessage.title = "Erreur lors du suivi";
            this.loginMessage.message = res.data;
        });
      });

    };



}
