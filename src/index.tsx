import { createStore, applyMiddleware, Store } from "redux";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import './styles/styles.scss'
import reducer from "./store/reducer";
import GlobalFilms from "./GlobalFilms";

const store: Store<VoteState, VoteAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalFilms />
    </BrowserRouter>
  </Provider>
);
