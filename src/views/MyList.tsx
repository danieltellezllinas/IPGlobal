import { useEffect, useState } from "react";
import { getRatedMovies } from "../config/api/api";

const MyList = () => {
  const [movies, setMovies] = useState<RatedMovie>();

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (sessionId) {
      getRatedMovies(sessionId).then((response) => setMovies(response.data));
    }
  }, []);

  return (
    <main>
      <h1 className="mylist__title">My Votes</h1>
      <div className="mylist__test">
        {movies?.results.map((movie) => (
          <div key={movie.id} className='mylist__global_div'>
            <div>
              <img
                src={"https://image.tmdb.org/t/p/w342" + movie?.poster_path}
                alt="NoImage"
              />
              <p>{movie.original_title}</p>
              <p>My rating: {movie.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyList;
