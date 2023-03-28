import "./App.css";
import Home from "./components/vistas/Home/Home";
import LandingPage from "./components/vistas/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Videogames from "./components/vistas/Videogames/Videogames";
import Create from "./components/vistas/Create/Create";
import Details from "./components/vistas/Details/Details";
import NavBar from "./components/bars/NavBar/NavBar";
import TopBar from "./components/bars/TopBar/TopBar";

function App() {
  return (
    <div className="App">
      <Router>
        <TopBar />
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exaxc path="/home" component={Home} />
          <Route exact path="/videogames" component={Videogames} />
          <Route exact path="/videogames/:id" component={Details} />
          <Route exact path="/create" component={Create} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
