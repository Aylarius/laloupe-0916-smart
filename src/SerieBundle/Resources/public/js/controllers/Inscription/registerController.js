function registerController(userService, sessionFactory, $timeout, $routeParams, $location, $rootScope) {

    this.userService = userService;
    this.sessionFactory = sessionFactory;
    this.$timeout = $timeout;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$routeParams = $routeParams;

    if (this.sessionFactory.isLogged === true){
      this.loggedin = true;
    }

    this.conditions = false;
    this.createAccount = () => {
        this.userService.create({
            username: this.username,
            password: this.password,
            passwordConf: this.passwordConf,
            email: this.email,
            picture: this.picture,
            conditions: this.conditions
        }).then((res) => {
          this.sessionFactory.token = res.data.token;
          this.sessionFactory.user = res.data.user;
            this.loginMessage = {};
            this.loginMessage.type = "success";
            this.loginMessage.title = "Votre compte a bien été créé !";
            this.loginMessage.message = "En cours de redirection...";
            this.$timeout(() => {
                this.loginMessage = null;
                this.$location.path('/inscriptionbis');
            }, 200);
        }).catch((res) => {
          this.sessionFactory.isLogged = false;
          this.$rootScope.$emit('loginStatusChanged', false);
          $rootScope.$emit('loginStatusChangedNavbar');
          $rootScope.$emit('loginStatusChangedHomepage');


            this.loginMessage = {};
            this.loginMessage.type = "error";
            this.loginMessage.title = "Erreur lors de l'inscription";
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


}
