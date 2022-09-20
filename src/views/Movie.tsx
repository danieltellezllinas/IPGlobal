import { Dispatch, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieInfo } from "../config/api/api";

import {AddVote} from '../components/AddVote'
import { useDispatch } from "react-redux";
import { addVote } from "../store/actionCreators";

const Movie = () => {
  const { movie_id } = useParams();
  let navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState<null | MovieInfo>(null);

  useEffect(() => {
    const movieId = parseInt(movie_id ? movie_id : "");
    if (isNaN(movieId)) navigate("/");
    else getMovieInfo(movieId).then((response) => setMovieInfo(response.data));
  }, [movie_id]);

  const dispatch: Dispatch<any> = useDispatch();

  const saveVote = useCallback(
    (vote: Vote) => dispatch(addVote(vote)),
    [dispatch]
  );

  return (
    <div className="movie__global_div">
      <div>
        <img
          src={"https://image.tmdb.org/t/p/w342" + movieInfo?.poster_path}
          alt="NoImage"
        />
      </div>
      <div className="movie__global_div_info">
        <h1 className="movie__margin-bottom20px">
          {movieInfo?.original_title}
        </h1>
        <p className="movie__margin-bottom20px">
          Release date: {movieInfo?.release_date}
        </p>
        <p className="movie__margin-bottom20px">{movieInfo?.overview}</p>
        <p className="movie__margin-bottom20px">
          Original language: {movieInfo?.original_language}
        </p>
        <p className="movie__margin-bottom20px">
          Vote average: {movieInfo?.vote_average}
        </p>
        <p className="movie__margin-bottom20px">Vote count: {movieInfo?.vote_count}</p>
        <form className="movie__form_global_div">
          <div className="movie__color252830">
            <label className="movie__color252830">
              Vote now:
              <input type="number" placeholder="Write here " name="vote" id="vote" max={10} className='movie__input_votenow movie__color252830'/>
            </label>
            <input className="movie__color252830" type="submit" value="Send" />
          </div>
        </form>
        <AddVote saveVote={saveVote} movieId={movieInfo?.id} />
      </div>
    </div>
  );
};

export default Movie;
