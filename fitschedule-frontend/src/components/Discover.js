"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'
import Page from "./Page";
import Map from "./Map";
import SearchBar from "./SearchBar";
import {Snackbar} from "react-md";

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {geolocation: null};
        this.searchSubmit = this.searchSubmit.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
        this.locationSubmit = this.locationSubmit.bind(this);
        this.useGeolocation = this.useGeolocation.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.showError = this.showError.bind(this);
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
        } else {
            console.log('[MapComponent] Browser does not support geolocation');
            this.addToast("Browser doesn't support location.");
        }
    }

    showPosition(position) {
        console.log('[MapComponent] Geolocation: lat:', position.coords.latitude, 'long:', position.coords.longitude);
        const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        this.setState({
            geolocation: geolocation
        });
    }

    showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log('[MapComponent] User denied the request for Geolocation');
                this.addToast("Please enable location permission.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log('[MapComponent] Location information is unavailable');
                this.addToast("Location information is unavailable. Please enter manually.");
                break;
            case error.TIMEOUT:
                console.log('[MapComponent] The request to get user location timed out');
                this.addToast("Please enable location from browser settings.");
                break;
            case error.UNKNOWN_ERROR:
                console.log('[MapComponent] An unknown error occurred');
                this.addToast("Unknown error. Location information is unavailable.");
                break;
        }
    }

    addToast(text, action) {
        this.setState((state) => {
            const toasts = state.toasts.slice();
            toasts.push({text, action});
            return {toasts};
        });
    }

    dismissToast() {
        const [, ...toasts] = this.state.toasts;
        this.setState({toasts});
    };

    searchSubmit(value) {
        const query = {
            course: value.course,
            dist: value.dist
        };
        if (value.useGeolocation && this.state.geolocation) {
            query.coord = this.state.geolocation;
        } else if (value.coord) {
            query.coord = value.coord;
        }

        if (query.coord) {
            console.log('[DiscoverComponent] Submitting query', query);
            this.props.onSubmit(query);
        } else {
            this.addToast("Please enable location or enter it manually.");
        }

    }

    locationSubmit(value) {
        this.setState({geolocation: value});
    }

    useGeolocation() {
        this.child.focusGeolocation();
    }

    render() {
        return (
            <Page>
                <SearchBar useGeolocation={() => this.useGeolocation()}
                           onSubmit={(value) => this.searchSubmit(value)}/>
                <Map geolocation={this.state.geolocation}
                     onSubmit={(value) => this.locationSubmit(value)}
                     onRef={ref => (this.child = ref)}/>
                <Snackbar toasts={this.state.toasts} autohide={true} onDismiss={this.dismissToast}/>
            </Page>
        );
    }
}

export default withRouter(Discover);