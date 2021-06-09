import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Routes } from '../../const';
import HomePage from '../../pages/HomePage/HomePage';

const ErrorPage = lazy(() => import('../../pages/ErrorPage/ErrorPage'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading....</div>}>
      <Switch>
        <Route exact path={Routes.HOME} component={HomePage} />
        <Route exact path={Routes.ERROR404} component={ErrorPage} />
        <Redirect to={Routes.HOME} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
