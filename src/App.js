import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Search from "./components/Search";
import Home from "./components/Home";
import Anime from "./components/Anime";
import "./App.css";

function App() {
  return (
    <Router>
      <h1 style={{ textAlign: "center" }}>
        <Link
          to="/"
          style={{
            color: "#4267B2",
            textDecoration: "none",
          }}
        >
          ANIPEDIA
        </Link>
      </h1>
      <div>
        <Switch>
          <Route exact path="/anime/:id">
            <Anime />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
