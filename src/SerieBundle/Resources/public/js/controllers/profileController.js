function profileController(Bouchonnage_profile, $location) {

    this.Bouchonnage_profile = Bouchonnage_profile;
    this.$location = $location;

    this.profile = (id) => {
        this.Bouchonnage_profile.utilisateur(id).then((response) =>{
          this.utilisateur = reponse.data;
          console.log(response.data);
        });
    };


    $('.progress-bar').each(function() {
        $(this).animate({
            width: $(this).attr('data-percent')
        }, 3000);
    });


}
