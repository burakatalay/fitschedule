"use strict";

import React from 'react';
import {Button, TextField} from 'react-md';
import {withRouter} from 'react-router-dom'
import Page from "./Page";

const containerStyle = {maxWidth: 500};
const rowStyle = {width: 200};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeInput(value) {
        this.setState(Object.assign({}, this.state, {input: value}));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.input);
    }

    render() {
        return (
            <Page>
                <form style={containerStyle} className="md-grid md-block-centered" onSubmit={this.handleSubmit}>
                    <h1 className="md-cell--center">FitSchedule</h1>
                    <h3 className="md-cell--center">Build your fitness schedule right now!</h3>
                    <div className="md-text-field-container md-cell--12">
                        <TextField
                            label="Eg. yoga, pilates"
                            id="discover"
                            type="text"
                            style={rowStyle}
                            className="md-cell--center md-text-field"
                            value={this.state.input}
                            onChange={this.handleChangeInput}/>
                    </div>
                    <Button id="submit" type="submit" style={rowStyle} raised primary className="md-cell--center md-cell-12">Discover</Button>
                </form>
            </Page>
        )
    }
}

export default withRouter(Home);