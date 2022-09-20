import { useEffect, useState } from "react";
import { getRatedMovies } from "../config/api/api";

const MyList = () => {
  const [movies, setMovies] = useState<RatedMovie>();

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if(sessionId) {
      getRatedMovies(sessionId).then(response => setMovies(response.data));
    }
  }, []);

  return (
    <main>
      <h1>My Votes</h1>
      {movies?.results.map(movie => <div key={movie.id}>
        <h1>{movie.original_title}</h1>
        <p>My rating: {movie.rating}</p>
      </div>)}
    </main>
  )
}

export default MyList