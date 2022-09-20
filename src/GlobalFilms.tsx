import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { createGuestSession } from "./config/api/api";
import Home from "./views/Home";
import Movie from "./views/Movie";
import MyList from "./views/MyList";

const GlobalFilms = () => {

  const doLogin = () => {
    createGuestSession().then(response => {
      localStorage.setItem("session_id", response.data.guest_session_id);
      localStorage.setItem("session_expires", response.data.expires_at);
    });
  }

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if(!sessionId) {
      doLogin();
    } else {
      const sessionExpires = localStorage.getItem("session_expires");
      if(sessionExpires) {
        const expiresDate = new Date(sessionExpires);
        const currentDate = new Date();
        if(currentDate > expiresDate) {
          localStorage.clear();
          doLogin();
        }
      }
    }
  }, []);

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
