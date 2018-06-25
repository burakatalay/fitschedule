import React from 'react';
import {withRouter} from 'react-router-dom'
import Page from "./Page";
import Map from "./Map";
import {Snackbar} from "react-md";

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toasts: [], geolocation: null};
        this.searchSubmit = this.searchSubmit.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
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
        if (!value.course) {
            this.addToast("Please enter a course name.");
            return;
        }
        const query = {
            course: value.course,
            dist: value.dist
        };
        if (value.useGeolocation && this.state.geolocation) {
            query.coord = this.state.geolocation;
        } else if (value.coord) {
            query.coord = value.coord;
        }

        if (!query.coord) {
            this.addToast("Please enable location or enter it manually.");
            return;
        }

        console.log('[DiscoverComponent] Submitting query', query);
        this.props.onSubmit(query);
    }

    render() {
        return (
            <Page>
                <Map onSubmit={(value) => this.searchSubmit(value)}/>
                <Snackbar toasts={this.state.toasts} autohide={true} onDismiss={this.dismissToast}/>
            </Page>
        );
    }
}

export default withRouter(Discover);