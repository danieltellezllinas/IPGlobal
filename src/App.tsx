import React, { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import { HOME, HOME_WITH_PAGE, MOVIE, MYLIST } from "./config/routes/paths";
import Home from "./views/Home";
import Movie from "./views/Movie";
import MyList from "./views/MyList";

const App = () => {
  return (
      <Routes>
        <Route path={HOME} element={<Home />}>
          <Route path={HOME_WITH_PAGE} element={<Home />} />
        </Route>
        <Route path={MYLIST} element={<MyList />} />
        <Route path={MOVIE} element={<Movie />} />
      </Routes>
    )
}

export default App;