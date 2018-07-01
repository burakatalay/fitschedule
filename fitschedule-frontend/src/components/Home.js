"use strict";

import React from 'react';
import {Button, Card, CardText, CardTitle, Cell, Grid, Media} from 'react-md';
import {withRouter} from 'react-router-dom'
import Page from "./Page";

const placeCenter = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};
const upperSection = {
    height: '700px',
    backgroundColor: '#EEE'
};

const lowerSection = {
    height: '700px'
};

const lowerHeader = {
    paddingTop: '15px'
};

const gridStyle = {
    height: '600px',
    padding: '16px'
};

const picStyle = {
    top: '15px',
    border: '1px solid',
    borderRadius: '50%',
    backgroundSize: 'cover',
    display: 'block',
    width: '150px',
    height: '150px'
};

const cardStyle = {
    height: '450px',
    width: '300px'
};

const backgroundImage = {
    maxWidth: '100%',
    height: 'auto',
    opacity: '0.2'
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push('/discover');
    }

    render() {
        return (
            <Page>
                <section>
                    <div>
                        <div style={backgroundImage}>
                            <Media>
                                <img
                                    src="https://static1.squarespace.com/static/59395a6af7e0ab64b2dec2b8/t/59d743958419c2e1411cb91a/1507279772412/fitness_efsaneleri_5.jpeg"/>
                            </Media>
                        </div>
                        <div style={placeCenter} className="md-text-center">
                            <form onSubmit={this.handleSubmit}>
                                <h1 className="md-display-4">FitSchedule</h1>
                                <h3 className="md-display-2">Build your fitness schedule right now!</h3>
                                <Button className="md-text-center" id="submit" type="submit" raised secondary>Get
                                    Started</Button>
                            </form>
                        </div>
                    </div>
                </section>
            </Page>
        )
    }
}


export default withRouter(Home);