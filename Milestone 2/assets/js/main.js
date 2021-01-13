// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da
// permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
// lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze
// piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della
// nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della
// nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca
// dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando
// attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di
// risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs

// vote_average


let app = new Vue({
    el: '#app',
    data: {

        genre: '',
        movie: 'movie',
        tv: 'tv',
        userResearch: '',
        searchResults: [],
        usefullInfo: [],
    },

    methods: {

        /**
         * Questo metodo serve selezionare la ricerca tra film e serie tv.
         * Questo è anche il primo elemento ad essere eseguito
         */
        genreSelector: function(){
            let oneOrtwo = document.getElementById('selettore').value;
            if (oneOrtwo == "film" ) {
                this.genre = this.movie;
            } else if (oneOrtwo == "tv" ) {
                this.genre = this.tv;
            }
        },

        /**
         * Questo metodo è stato rinominato poichè ora è in grado di trovare sia serie tv che film.
         * (il suo nome precedente era: obtainMovieInfo)
         */
        obtainInfo: function(type,find){
            axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=5c002e8033723e03762798df6a4b2e57&language=it_IT&query=${find}`)
			.then(result =>{
                const data = result.data.results;
				this.searchResults = data;
                console.log(this.searchResults);

                // questa sezione serve a selezionare solo gli elementi che ci servono, nello specifico:
                // 1) questo .forEach ripulisce l'oggetto
                this.searchResults.forEach(clearArray => {
                    this.usefullInfo.splice(clearArray.lenght);
                    console.log(this.searchResults);
                });
                // 2)questo .forEach inserisce i nuovi dati nell'oggetto
                this.searchResults.forEach(resultTwo => {
                    let vote = Math.round(resultTwo.vote_average/2);
                    const fStar = [];
                    for (var index = 0; index < vote; index++) {
                        fStar.push('star');
                    }
                    this.usefullInfo.push({
                        title: resultTwo.title,
                        original_title: resultTwo.original_title,
                        name: resultTwo.name,
                        original_name: resultTwo.original_name,
                        original_language: resultTwo.original_language,
                        vote_average: Math.round(resultTwo.vote_average/2),
                        fullStar: fStar,
                    });
                });
            })
        },
    },

    mounted(){

        // this.obtainMovieInfo(userResearch);
        this.genreSelector();
	}
})