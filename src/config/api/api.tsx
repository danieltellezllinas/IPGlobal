import axios from "axios";

export const Api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "8f781d70654b5a6f2fa69770d1d115a3"
    }
});

export const getPopularMovies = (page: number) => {
    return Api({
        method: "GET",
        url: "/movie/popular",
        params: {
            page
        }
    });
}

export const getSearchResults = (searchText: string, page: number) => {
    return Api({
        method: "GET",
        url: "/search/movie",
        params: {
            query: searchText,
            page
        }
    });
}

export const getMovieInfo = (id: number) => {
    return Api({
        method: "GET",
        url: "/movie/" + id
    });
}