"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'
import Page from "./Page";
import Map from "./Map";
const containerStyle = {width: 1000, height: 1000};
const mapStyle = {width: 500, height: 500};

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: props.match.params.input,
            isMarkerShown: true
        };
        this.getInnerRef = this.getInnerRef.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    innerRef;

    getInnerRef(ref) {
        this.innerRef = ref;
    }

    getLocation() {
        this.innerRef && this.innerRef.getLocation();
    }

    render() {
        return (
            <Page>
                <div style={containerStyle} className="md-grid md-block-centered">
                    <h1 className="md-cell--center">{this.state.input}</h1>
                    <Map isMarkerShown />
                </div>
            </Page>
        )
    }
}

export default withRouter(Discover);