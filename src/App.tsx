import { Routes, Route } from "react-router-dom";
import { HOME, MYLIST } from "./config/routes/paths";
import Home from "./views/Home";
import MyList from "./views/MyList";

const App = () => {
  return (
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={MYLIST} element={<MyList />} />
      </Routes>
  )
}

export default App;