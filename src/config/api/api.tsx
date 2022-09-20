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

export const createGuestSession = () => {
    return Api({
        method: "GET",
        url: "/authentication/guest_session/new"
    });
}

export const sendVote = (movieId: number | undefined, sessionId: string | null, rate: number) => {
    return Api({
        method: "POST",
        url: "/movie/" + movieId + "/rating",
        params: {
            guest_session_id: sessionId
        },
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        data: {
            value: rate
        }
    });
}

export const getRatedMovies = (sessionId: string) => {
    return Api({
        method: "GET",
        url: "/guest_session/" + sessionId + "/rated/movies"
    });
}