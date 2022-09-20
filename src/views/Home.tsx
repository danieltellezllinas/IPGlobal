import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getPopularMovies, getSearchResults } from "../config/api/api";

interface PopularMovies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface Movie {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
}

const Home = () => {
  const { page_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({});
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
  });

  const doSearch = () => {
    const searchQuery = searchText?.current?.value;
    if (searchQuery) {setSearchParams({ query: searchQuery });}
    else navigate("/");
  };

  return (
    <div className="home__global_div">
      <h1>Películas populares</h1>
      <h3>
        Buscar película <input type="text" ref={searchText} />{" "}
        <button onClick={doSearch}>Buscar</button>
      </h3>
      <section className="home__section_globalfilms">
        {movies?.results.map((movie) => (
          <div key={movie.id} className="home__div_film">
            <Link to={"/movie/" + movie.id}>
              <img
                src={"https://image.tmdb.org/t/p/w342" + movie.poster_path}
                alt="NoImage"
              />
            </Link>
            {movie.original_title}
          </div>
        ))}
      </section>
      {movies && (
        <div className="home__pagination">
          {movies?.page > 1 && (
            <Link
              className="home__pagination_prev"
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
              className="home__pagination_back"
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
