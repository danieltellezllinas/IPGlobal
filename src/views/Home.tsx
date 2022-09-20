import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getPopularMovies, getSearchResults } from "../config/api/api";

const Home = () => {
  const { page_id } = useParams();
  const [searchParams] = useSearchParams({});
  let navigate = useNavigate();
  const [movies, setMovies] = useState<null | PopularMovies>(null);
  const searchText = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const pageId = page_id ? parseInt(page_id) : 1;
    const searchQuery = searchParams.get("query");
    if (searchQuery)
      getSearchResults(searchQuery, pageId).then((response) =>
        setMovies(response.data)
      );
    else getPopularMovies(pageId).then((response) => setMovies(response.data));
  }, []);

  const doSearch = () => {
    const searchQuery = searchText?.current?.value;
    if (searchQuery) {
      navigate("/?query=" + searchQuery);
    } else navigate("/");
  };

  return (
    <div className="home__global_div">
      <h1>Popular movies</h1>
      <div className="home__search_global_div">
        <input
          className="home__search_input"
          placeholder="Search Movies..."
          type="text"
          ref={searchText}
        />{" "}
        <button className="home__search_button" onClick={doSearch}>
          Search
        </button>
      </div>
      <section className="home__section_globalfilms">
        {movies?.results.map((movie) => (
          <div key={movie.id} className="home__div_film">
            <Link to={"/movie/" + movie.id}>
              <img
                src={movie.poster_path ? "https://image.tmdb.org/t/p/w342" + movie.poster_path : "https://image.tmdb.org/t/p/w342/8Neb8Kuej7R4LUJCGM6ljWt9qa1.jpg"}
                alt="NoImage"
              />
            </Link>
            <div className="home__titleanddatefilm">
              <p>{movie.original_title}</p>
              <p>{movie.release_date}</p>
            </div>
          </div>
        ))}
      </section>
      {movies && (
        <div className="home__pagination">
          {movies?.page > 1 && (
            <Link
              className="home__pagination_back_prev"
              to={
                "/" +
                (movies?.page - 1) +
                (searchParams.get("query")
                  ? "?query=" + searchParams.get("query")
                  : "")
              }
            >
              {"<"} Prev
            </Link>
          )}
          <div className="home__pagination_actualPage">
            {movies?.page && movies.page}
          </div>
          {movies?.page < movies.total_pages && (
            <Link
              className="home__pagination_back_prev"
              to={
                "/" +
                (movies?.page + 1) +
                (searchParams.get("query")
                  ? "?query=" + searchParams.get("query")
                  : "")
              }
            >
              Next {">"}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
