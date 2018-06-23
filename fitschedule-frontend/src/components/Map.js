import React from 'react';
import GoogleMapReact from 'google-map-react';
import {FontIcon} from "react-md";
import {geolocated} from 'react-geolocated';

const personPin = {fontSize: 30};
const getDirection = (degrees, isLongitude) =>
    degrees > 0
        ? (isLongitude ? 'E' : 'N')
        : (isLongitude ? 'W' : 'S');
const formatDegrees = (degrees, isLongitude) =>
    `${0 | degrees}° ${0 | (degrees < 0 ? degrees = -degrees : degrees) % 1 * 60}' ${0 | degrees * 60 % 1 * 60}" ${getDirection(degrees, isLongitude)}`

class Map extends React.Component {
    constructor(props) {
        super(props);

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
        const {props} = this;
        return !props.isGeolocationAvailable
            ? <div>Your browser does not support Geolocation.
                {/*<button onClick={getLocation}>Get location</button>*/}
            </div>
            : !props.isGeolocationEnabled
                ? <div>Geolocation is not enabled.</div>
                : this.props.coords
                    ?
                    // Important! Always set the container height explicitly
                    <div style={{height: '90vh', width: '100%'}}>
                        <h1>{this.props.isGeolocationAvailable}</h1>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: 'AIzaSyB5oqtbEdUtP1TmVDXf3PWEwUh05x7R6uc'}}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}>
                            <FontIcon secondary style={personPin} lat={props.coords.latitude}
                                      lng={props.coords.longitude}>person_pin</FontIcon>
                        </GoogleMapReact>
                    </div>
                    : <div>Getting the location data&hellip; </div>;
    }
}

Map.defaultProps = {
    center: {
        lat: 48.1351,
        lng: 11.5820
    },
    zoom: 11
}
// export default Map;
export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(Map);
