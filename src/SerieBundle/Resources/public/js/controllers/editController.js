function editController(userService, sessionFactory, $timeout, $routeParams, $location, $rootScope) {

    this.userService = userService;
    this.sessionFactory = sessionFactory;
    this.$timeout = $timeout;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$routeParams = $routeParams;

    console.log(this.picture);
    this.editAccount = () => {
        this.userService.update({
            id: this.sessionFactory.user.id,
            username: this.sessionFactory.user.username,
            password: this.password,
            passwordConf: this.passwordConf,
            email: this.sessionFactory.user.email,
            picture: this.picture
        }).then((res) => {
            this.loginMessage = {};
            if (res.data.token === undefined) {
                this.sessionFactory.user = res.data;
            } else {
                this.sessionFactory.token = res.data.token;
                this.sessionFactory.user = res.data.user;
            }
            this.loginMessage.type = "success";
            this.loginMessage.title = "Votre compte a bien été modifié !";
            this.loginMessage.message = "En cours de redirection...";
            this.$timeout(() => {
                this.loginMessage = null;
                this.$rootScope.$emit('loginStatusChanged', true);
                $rootScope.$emit('loginStatusChangedNavbar');
                $rootScope.$emit('loginStatusChangedHomepage');
                this.$location.path('/profil');
            }, 2000);
        }).catch((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "error";
            this.loginMessage.title = "Erreur lors de la modification";
            this.loginMessage.message = res.data;
        });
    };

    const that = this;

    function uploadFile(file) {
        var url = '/user/picture';
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Every thing ok, file uploaded
                that.picture = (JSON.parse(xhr.responseText).fileUploaded); // handle response.
            }
        };
        fd.append("picture", file);
        xhr.send(fd);
    }

    var uploadfiles = document.querySelector('#uploadImage');
    uploadfiles.addEventListener('change', function() {
        var files = this.files;
        for (var i = 0; i < files.length; i++) {
            uploadFile(this.files[i]); // call the function to upload the file
        }
    }, false);

    this.isToggledPseudo = false;
    this.isToggledEmail = false;
    this.isToggledPassword = false;
    this.toggleInputOne = () => {
        this.isToggledPseudo = !this.isToggledPseudo;
    };
    this.toggleInputTwo = () => {
        this.isToggledEmail = !this.isToggledEmail;
    };
    this.toggleInputThree = () => {
        this.isToggledPassword = !this.isToggledPassword;
    };

    this.deactivateAccount = () => {
        this.userService.deactivate({
            id: this.sessionFactory.user.id,
            deactivate: true
        }).then((res) => {
            this.loginMessage = {};
        this.loginMessage.type = "success";
        this.loginMessage.title = "Votre compte a bien été désactivé !";
        this.loginMessage.message = "En cours de redirection...";
        this.sessionFactory.isLogged = false;
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('currentUser');
        this.sessionFactory.user = {};
        this.sessionFactory.token = null;
        this.$rootScope.$emit('loginStatusChanged', false);
        $rootScope.$emit('loginStatusChangedNavbar');
        $rootScope.$emit('loginStatusChangedHomepage');
        this.isLogged = false;
        this.$location.path('/');
    }).catch((res) => {
            this.loginMessage = {};
        this.loginMessage.type = "error";
        this.loginMessage.title = "Erreur lors de la désactivation";
        this.loginMessage.message = res.data;
    });
    };


}
