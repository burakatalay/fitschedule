import React from 'react';
import GoogleMapReact from 'google-map-react';
import {FontIcon, Snackbar, TextField} from "react-md";
import MapPin from "./MapPin";
import {withRouter} from "react-router-dom";

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {toasts: []};
        this.dismissToast = this.dismissToast.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    focusGeolocation() {
        if(this.state.geolocation) {
            this.setState({
                center: {
                    lat: this.state.geolocation.latitude,
                    lng: this.state.geolocation.longitude
                },
                zoom: 50
            });
        } else {
            this.addToast("Please enable location permission.");
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
                    defaultZoom={this.props.zoom}
                    center={this.state.center}
                    zoom={this.state.zoom}>
                    {
                        this.props.geolocation && <MapPin isPerson={true}
                                                          lat={this.props.geolocation.lat}
                                                          lng={this.props.geolocation.lng}/>
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

