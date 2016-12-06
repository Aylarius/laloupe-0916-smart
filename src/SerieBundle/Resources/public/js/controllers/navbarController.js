function navbarController (){

    $('#myModal').on('shown.bs.modal', function() {
        $('#myInput').focus();
    });

    this.isToggled = false;
    this.toggleSearch = () => {
        this.isToggled = !this.isToggled;
        console.log(this.isToggled);
        if (this.isToggled === false) {
            $('#searchHide').hide();
        } else {
            $('#searchHide').show();
        }
    }
}
