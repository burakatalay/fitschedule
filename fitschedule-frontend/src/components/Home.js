"use strict";

import React from 'react';
import {Button, TextField} from 'react-md';
import {withRouter} from 'react-router-dom'
import Page from "./Page";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <Page>
                <form onSubmit={this.handleSubmit}>
                    <h1>FitSchedule</h1>
                    <h3>Build your fitness schedule right now!</h3>
                    <Button id="submit" type="submit" raised secondary>Get Started</Button>
                </form>
            </Page>
        )
    }
}

export default withRouter(Home);