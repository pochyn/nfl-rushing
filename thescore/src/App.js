import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NflRushing from "./nfl-rushing/NflRushing"
import NotFoundPage from "./error-page/NotFoundPage"


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/nfl" />
        </Route>
        <Route path="/nfl" exact component={NflRushing} />
        <Route render={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
