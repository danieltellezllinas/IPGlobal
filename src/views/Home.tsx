import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Search from "../components/Search";
import { getPopularMovies, getSearchResults } from "../config/api/api";

const Home = () => {
  const { page_id } = useParams();
  const [searchParams] = useSearchParams({});
  const [movies, setMovies] = useState<null | PopularMovies>(null);

  useEffect(() => {
    const pageId = page_id ? parseInt(page_id) : 1;
    const searchQuery = searchParams.get("query");
    if (searchQuery)
      getSearchResults(searchQuery, pageId).then((response) =>
        setMovies(response.data)
      );
    else getPopularMovies(pageId).then((response) => setMovies(response.data));
  }, [searchParams, page_id]);

  return (
    <div className="home__global_div">
      <h1>Popular movies</h1>
      <Search />
      <section className="home__section_globalfilms">
        {movies?.results.map((movie) => (
          <div key={movie.id} className="home__div_film">
            <Link to={"/movie/" + movie.id}>
              <img
                src={
                  movie.poster_path
                    ? "https://image.tmdb.org/t/p/w342" + movie.poster_path
                    : "https://image.tmdb.org/t/p/w342/8Neb8Kuej7R4LUJCGM6ljWt9qa1.jpg"
                }
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
              to={
                "/" +
                (movies?.page - 1) +
                (searchParams.get("query")
                  ? "?query=" + searchParams.get("query")
                  : "")
              }
              className="home__pagination_back_prev"
            >
              {"<"} Prev
            </Link>
          )}
          <div className="home__pagination_actualPage">
            {movies?.page && movies.page}
          </div>
          {movies?.page < movies.total_pages && (
            <Link
              to={
                "/" +
                (movies?.page + 1) +
                (searchParams.get("query")
                  ? "?query=" + searchParams.get("query")
                  : "")
              }
              className="home__pagination_back_prev"
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
