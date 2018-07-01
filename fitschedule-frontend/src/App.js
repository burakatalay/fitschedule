"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserService from "./services/UserService";
import CourseForm from "./components/CourseForm";
import Schedule  from './components/Schedule';
import Discover from "./components/Discover";
import Home from "./components/Home";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'FitSchedule',
            routes: [
                { component: Home , path: '/', exact: true},
                { component: Discover, path: '/discover', exact: true},
                { component: Schedule , path: '/schedule', exact: true},
                { component: CourseForm , path: '/add', exact: true},
                { render: (props) => {
                    if(UserService.isAuthenticated()) {
                        return (<Schedule {... props} />)
                    }
                    else {
                        return (<Redirect to={'/login'}/>)
                    }}, path: '/add',},
                { component: UserLogin, path: '/login'},
                { component: UserSignup, path: '/register'}
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

