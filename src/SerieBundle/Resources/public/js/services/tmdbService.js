function tmdbService($http) {

    this.$http = $http;
    this.tmdbFactory = {};
    //Page d'accueil
    //slider en-tête
    this.topRatedEpisode = () => {
      if(!this.tmdbFactory.topRatedEpisode) {
        this.tmdbFactory.topRatedEpisode = this.$http.get("https://api.themoviedb.org/3/tv/top_rated?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&page=1");
      }
      return this.tmdbFactory.topRatedEpisode;
    };
    //slider serie populaire
    this.popular = () => {
      if(!this.tmdbFactory.popular) {
        this.tmdbFactory.popular = this.$http.get("https://api.themoviedb.org/3/discover/tv?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&sort_by=popularity.desc");
      }
      return this.tmdbFactory.popular;
    };
    //slider aléatoire
    this.randomEpisode = () => {
      if(!this.tmdbFactory.randomEpisode) {
        this.tmdbFactory.randomEpisode = this.$http.get("https://api.themoviedb.org/3/tv/popular?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&page=1");
      }
      return this.tmdbFactory.randomEpisode;
    };

    this.sheetSerie = (id) => {
      if(!this.tmdbFactory.sheetSerie) {
        this.tmdbFactory.sheetSerie = {};
      }
      if(!this.tmdbFactory.sheetSerie[id]) {
        this.tmdbFactory.sheetSerie[id] = this.$http.get("https://api.themoviedb.org/3/tv/"+ id +"?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
      }
      return this.tmdbFactory.sheetSerie[id];
    };

    this.people = (id) => {
      if(!this.tmdbFactory.people) {
        this.tmdbFactory.people = {};
      }
      if(!this.tmdbFactory.people[id]) {
        this.tmdbFactory.people[id] = this.$http.get("https://api.themoviedb.org/3/tv/"+ id +"/credits?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
      }
      return this.tmdbFactory.people[id];
    };

    this.seasons = (id, season) => {
      if(!this.tmdbFactory.seasons) {
        this.tmdbFactory.seasons = {};
      }
      if(!this.tmdbFactory.seasons[id]) {
        this.tmdbFactory.seasons[id] = {};
      }
      if(!this.tmdbFactory.seasons[id][season]) {
        this.tmdbFactory.seasons[id][season] = this.$http.get("https://api.themoviedb.org/3/tv/"+ id +"/season/"+ season +"?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
      }
      return this.tmdbFactory.seasons[id][season];
    };

    this.lastEpisode = (id, season, episode) => {
      if(!this.tmdbFactory.lastEpisode) {
        this.tmdbFactory.lastEpisode = {};
      }
      if(!this.tmdbFactory.lastEpisode[id]) {
        this.tmdbFactory.lastEpisode[id] = {};
      }
      if(!this.tmdbFactory.lastEpisode[id][season]) {
        this.tmdbFactory.lastEpisode[id][season] = {};
      }
      if(!this.tmdbFactory.lastEpisode[id][season][episode]) {
        this.tmdbFactory.lastEpisode[id][season][episode] = this.$http.get("https://api.themoviedb.org/3/tv/"+ id +"/season/"+ season + "/episode/" + episode + "?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
      }
      return this.tmdbFactory.lastEpisode[id][season][episode];
    };

    this.search = (query, page) => {
      if(!this.tmdbFactory.search) {
        this.tmdbFactory.search = {};
      }
      if(!this.tmdbFactory.search[query]) {
        this.tmdbFactory.search[query] = {};
      }
      if(!this.tmdbFactory.search[query][page]) {
        this.tmdbFactory.search[query][page] = this.$http.get("https://api.themoviedb.org/3/search/tv?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&query="+ query +"&page="+ page);
      }
      return this.tmdbFactory.search[query][page];
    };

    this.getTag = () => {
      if(!this.tmdbFactory.getTag) {
        this.tmdbFactory.getTag = this.$http.get("https://api.themoviedb.org/3/genre/tv/list?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
      }
      return this.tmdbFactory.getTag;
    };

}
