import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Redirect, Route, Switch } from 'react-router-dom';
const SuperAdmins = lazy(() => import('Components/SuperAdmins'));
const SuperAdminsForm = lazy(() => import('Components/SuperAdmins/Form'));

const routes = [{ name: 'home', path: '/super-admins' }];
const SuperAdminsRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={SuperAdmins} />
        <Route exact path={`${url}/form`} component={SuperAdminsForm} />
        <Route path={`${url}/form/:id`} component={SuperAdminsForm} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default SuperAdminsRouter;
