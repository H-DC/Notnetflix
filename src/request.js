const API_KEY = process.env.REACT_APP_API_KEY
const URL_BASE = 'https://api.themoviedb.org/3'

const requests = {
    urlTrending : `${URL_BASE}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    urlNetflix : `${URL_BASE}/discover/tv?api_key=${API_KEY}&with_networks=213`,
    urlActionMovies : `${URL_BASE}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    urlComedyMovies : `${URL_BASE}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    urlDocumentaryMovies : `${URL_BASE}/discover/movie?api_key=${API_KEY}&with_genres=99`,
}

export default requests;
