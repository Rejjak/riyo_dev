import React,{useEffect} from "react";
import Home from './components/home/home';
import MyProfile from './components/account/account';
import Team from './components/team/team';
import About from './components/about/about';
import { Switch, Route } from "react-router-dom";

function App() {
    return (
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/account" component={MyProfile} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/about" component={About} />
      </Switch>
    );
}


export default App;