import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Chat from "../pages/chat";
import Main from "../pages/main";

const PrivateRoutes = () => {
    return <Switch>
        <Route path={'/main'} component={Main} />
        <Route path={'/chat/user/:_id'} component={Chat} />
        <Route render={() => <Redirect to={'/main'} />} />
    </Switch>
}

export default PrivateRoutes;