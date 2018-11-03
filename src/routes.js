import { Switch, Route } from "react-router-dom";
import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import SignUp from "./components/user/SignUp";
import PageContainer1 from "./components/PageContainer1";
import AllHomework from "./components/homework/AllHomework";
import Results from "./components/homework/Results";
import Edit from "./components/homework/Edit";
import Vocab from "./components/vocab/Vocab";

export default (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/signup" component={SignUp} />
    <Route path="/homework/write" component={PageContainer1} />
    <Route path="/homework/all" component={AllHomework} />
    <Route path="/homework/results/:id" component={Results} />
    <Route path="/homework/edit/:id" component={Edit} />
    <Route path="/vocab" component={Vocab} />
  </Switch>
);
