"use strict";

import React from 'react';
import {Button, TextField} from 'react-md';
import {withRouter} from 'react-router-dom'
import Page from "./Page";

const containerStyle = {maxWidth: 500};
const rowStyle = {width: 200};

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: props.match.params.input
        };
    }

    render() {
        return (
            <Page>
                <div style={containerStyle} className="md-grid md-block-centered">
                    <h1 className="md-cell--center">{this.state.input}</h1>
                </div>
            </Page>
        )
    }
}

export default withRouter(Discover);