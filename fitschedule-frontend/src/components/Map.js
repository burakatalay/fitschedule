import React from 'react';
import GoogleMapReact from 'google-map-react';
import {FontIcon, Snackbar, TextField} from "react-md";
import MapPin from "./MapPin";
import {withRouter} from "react-router-dom";

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {toasts: [], geolocation: null};

        this.showPosition = this.showPosition.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
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
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        this.setState({
            geolocation: geolocation
        });
        this.props.onSubmit(geolocation);
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

    handleChangeCourse(value) {
        this.setState({course: value});
    }

    render() {
        return (
            <div style={{height: '80vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyB5oqtbEdUtP1TmVDXf3PWEwUh05x7R6uc'}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}>
                    {
                        this.state.geolocation && <MapPin isPerson={true}
                                                          lat={this.state.geolocation.latitude}
                                                          lng={this.state.geolocation.longitude}/>
                    }
                </GoogleMapReact>
                <Snackbar toasts={this.state.toasts} autohide={true} onDismiss={this.dismissToast}/>
            </div>
        );
    }
}

Map.defaultProps = {
    center: {
        lat: 48.1351,
        lng: 11.5820
    },
    zoom: 11
};

export default withRouter(Map);

