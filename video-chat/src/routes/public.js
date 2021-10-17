import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";

const PublicRoutes = () => {
    return <Switch>
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
        <Route render={() => <Redirect to={'/register'} />} />
    </Switch>
}

export default PublicRoutes;