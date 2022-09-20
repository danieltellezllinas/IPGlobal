import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieInfo } from "../config/api/api";

interface MovieInfo {
    id: number,
    original_title: string
}

const Movie = () => {
    const { movie_id } = useParams();
    let navigate = useNavigate();
    const [movieInfo, setMovieInfo] = useState<null | MovieInfo>(null);

    useEffect(() => {
        const movieId = parseInt(movie_id ? movie_id : "");
        if(isNaN(movieId)) navigate('/');
        else getMovieInfo(movieId).then(response => setMovieInfo(response.data));
    });

    return <h1>Película {movieInfo?.original_title};</h1>
}

export default Movie;