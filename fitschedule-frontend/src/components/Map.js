import React from 'react';
import GoogleMapReact from 'google-map-react';
import {FontIcon} from "react-md";
import {geolocated} from 'react-geolocated';

const personPin = {fontSize: 30};
const Marker = () => <FontIcon secondary style={personPin}>person_pin</FontIcon>;

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    geolocationUnavailable() {

    }

    geolocationDisabled() {

    }

    render() {
        return <div style={{height: '90vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyB5oqtbEdUtP1TmVDXf3PWEwUh05x7R6uc'}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}>
                {this.props.coords && <Marker lat={this.props.coords.latitude}
                                              lng={this.props.coords.longitude}/>}
            </GoogleMapReact>
        </div>

        //
        // !this.props.isGeolocationAvailable
        //     ? <div>Your browser does not support Geolocation.</div>
        //     : !this.props.isGeolocationEnabled
        //         ? <div>Geolocation is not enabled.</div>
        //         : this.props.coords
        //             ?
        //             : <div>Getting the location data&hellip; </div>;
    }
}

Map.defaultProps = {
    center: {
        lat: 48.1351,
        lng: 11.5820
    },
    zoom: 11
};
// export default Map;
export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(Map);
