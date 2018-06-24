"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'
import Page from "./Page";
import Map from "./Map";
import SearchBar from "./SearchBar";

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.searchSubmit = this.searchSubmit.bind(this);
        this.locationSubmit = this.locationSubmit.bind(this);
        this.useGeolocation = this.useGeolocation.bind(this);
    }

    searchSubmit(value) {
        console.log('[DiscoverComponent] Search submit', value);

    }

    locationSubmit(value) {
        this.setState({geolocation: value});
    }

    useGeolocation() {

    }

    render() {
        return (
            <Page>
                <SearchBar useGeolocation={() => this.useGeolocation()} onSubmit={(value) => this.searchSubmit(value)}/>
                <Map onSubmit={(value) => this.locationSubmit(value)}/>
            </Page>
        )
    }
}

export default withRouter(Discover);