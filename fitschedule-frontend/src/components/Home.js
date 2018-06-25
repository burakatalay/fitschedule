"use strict";

import React from 'react';
import {Button, Grid, Cell} from 'react-md';
import {withRouter} from 'react-router-dom'
import Page from "./Page";

const placeCenter = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}
const upperSection = {
    'height': '700px',
}

const lowerSection = {
    'backgroundColor': 'grey',
    'height': '700px'
}

const cell = {
    'margin-left': '5px',
    'padding-right': '5px',
    'padding-top': '5px',
    'padding-bottom': '5px',
}

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
                <section style={upperSection}>
                    <div style={placeCenter} className="md-text-center">
                        <form onSubmit={this.handleSubmit}>
                            <h1 className="md-display-4">FitSchedule</h1>
                            <h3 className="md-display-2">Build your fitness schedule right now!</h3>
                            <Button className="md-text-center" id="submit" type="submit" raised secondary>Get Started</Button>
                        </form>
                    </div>
                </section>
                <section style={lowerSection}>
                    <Grid>
                        <Cell size={4}>4</Cell>
                        <Cell size={4}>4</Cell>
                        <Cell size={4}>4</Cell>
                    </Grid>
                </section>
            </Page>
        )
    }
}


export default withRouter(Home);