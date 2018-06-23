import React from 'react';
import GoogleMapReact from 'google-map-react';
import {FontIcon} from "react-md";

const personPin = {fontSize: 30};

class Map extends React.Component {
    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '90vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyB5oqtbEdUtP1TmVDXf3PWEwUh05x7R6uc'}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}>
                    <FontIcon secondary style={personPin} lat={48.264846} lng={11.671344}>person_pin</FontIcon>
                </GoogleMapReact>
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
}
export default Map;