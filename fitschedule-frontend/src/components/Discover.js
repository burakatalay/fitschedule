"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'
import Page from "./Page";
import Map from "./Map";

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: !!props.match.params.input,
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
                <Map/>
            </Page>
        )
    }
}

export default withRouter(Discover);