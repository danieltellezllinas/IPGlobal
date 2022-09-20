import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Movie from "./views/Movie";
import MyList from "./views/MyList";

const GlobalFilms = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/:page_id' element={<Home />} />
        </Route>
        <Route path='/mylist' element={<MyList />} />
        <Route path='/movie/:movie_id' element={<Movie />} />
      </Routes>
    </>
  );
};

export default GlobalFilms;
