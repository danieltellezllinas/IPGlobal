import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getPopularMovies, getSearchResults } from '../config/api/api';

interface PopularMovies {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number,
}

interface Movie {
  id: number,
  original_title: string,
  overview: string
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
    if(searchQuery)
      getSearchResults(searchQuery, pageId).then(response => setMovies(response.data));
    else
      getPopularMovies(pageId).then(response => setMovies(response.data));
  });

  const doSearch = () => {
    const searchQuery = searchText?.current?.value;
    if(searchQuery) setSearchParams({query: searchQuery});
    else navigate('/');
  }

  return (
    <div>
      <h1>Películas populares</h1>
      <h3>Buscar película <input type="text" ref={searchText} /> <button onClick={doSearch}>Buscar</button></h3>
      <ul>
        {movies?.results.map(movie => <li key={movie.id}><Link to={"/movie/" + (movie.id)}>{movie.original_title}</Link></li>)}
      </ul>
      {movies && <div className="pagination">
        {movies?.page > 1 && <a href={"/" + (movies?.page - 1) + (searchParams.get("query") ? "?query=" + searchParams.get("query") : "")}>Anterior</a>}
        {movies?.page && movies.page}
        {movies?.page < movies.total_pages && <a href={"/" + (movies?.page + 1) + (searchParams.get("query") ? "?query=" + searchParams.get("query") : "")}>Siguiente</a>}
      </div>}
    </div>
  )
}

export default Home;