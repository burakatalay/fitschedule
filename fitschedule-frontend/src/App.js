"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { HomeView } from './views/HomeView';
import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";

import UserService from "./services/UserService";
import { ScheduleView } from './views/ScheduleView';
import Discover from "./components/Discover";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'FitSchedule',
            routes: [
                { component: HomeView , path: '/', exact: true},
                { component: Discover, path: '/discover', exact: true},
                { component: ScheduleView , path: '/schedule', exact: true},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<MovieFormView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }} , path: '/edit/:id'},
                { render: (props) => {
                    if(UserService.isAuthenticated()) {
                        return (<ScheduleView {... props} />)
                    }
                    else {
                        return (<Redirect to={'/login'}/>)
                    }}, path: '/add',},
                { component: UserLoginView, path: '/login'},
                { component: UserSignupView, path: '/register'}
            ]
        };
    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                    </Switch>
                </Router>
            </div>
        );
    }
}

