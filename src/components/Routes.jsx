import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainNav from './Nav';
import FetchCoins from './FetchCoins';
import Charts from './Charts';


const Routes = () => (
  <BrowserRouter>
    <div id="wrap">
      <MainNav />
      <Switch>
        <Route exact path="/" component={FetchCoins} />
        <Route exact path="/chart" component={Charts} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
