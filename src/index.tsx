import ReactDOM from 'react-dom/client';
import GlobalFilms from './GlobalFilms';
import { BrowserRouter } from "react-router-dom";
import './styles/styles.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <GlobalFilms />
  </BrowserRouter>
);
