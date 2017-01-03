function tmdbService($http) {

    this.$http = $http;


    this.popular = () => {
        return this.$http.get("https://api.themoviedb.org/3/discover/tv?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&sort_by=popularity.desc");
    };

    this.sheetSerie = (id) => {
        return this.$http.get("https://api.themoviedb.org/3/tv/"+ id +"?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
    };

    this.randomEpisode = () => {
        return this.$http.get("https://api.themoviedb.org/3/tv/top_rated?api_key=fc533e12b849e49e74ab5d046165bcc7&language=en-US&page=1");
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
