import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './home';
import { Thanks } from './thanks';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/thanks" component={Thanks} />

      <Redirect to="/" />
    </Switch>
  );
}
