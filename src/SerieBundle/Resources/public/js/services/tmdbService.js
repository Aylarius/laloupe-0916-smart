function tmdbService($http) {

    this.$http = $http;

    //Page d'accueil
    //slider en-tête
    this.topRatedEpisode = () => {
      return this.$http.get("https://api.themoviedb.org/3/tv/top_rated?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&page=1")
    }
    //slider serie populaire
    this.popular = () => {
        return this.$http.get("https://api.themoviedb.org/3/discover/tv?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&sort_by=popularity.desc");
    };
    //slider aléatoire
    this.randomEpisode = () => {
      return this.$http.get("https://api.themoviedb.org/3/discover/tv?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&sort_by=vote_average.desc&page=1&timezone=France/PARIS&include_null_first_air_dates=false&with_original_language=en&fr");
    };


    this.sheetSerie = (id) => {
        return this.$http.get("https://api.themoviedb.org/3/tv/"+ id +"?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
    };

    this.people = (id) => {
      return this.$http.get("https://api.themoviedb.org/3/tv/"+ id +"/credits?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
    };

    this.seasons = (id, season) => {
      return this.$http.get("https://api.themoviedb.org/3/tv/"+ id +"/season/"+ season +"?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
    };

    this.search = (query, page) => {
      return this.$http.get("https://api.themoviedb.org/3/search/tv?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&query="+ query +"&page="+ page);
    };

}
