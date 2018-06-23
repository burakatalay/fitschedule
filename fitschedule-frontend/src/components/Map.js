import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends React.Component {
    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyB5oqtbEdUtP1TmVDXf3PWEwUh05x7R6uc' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text={'Ananin Avrora'}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}
Map.defaultProps = {center: {
        lat: 59.95,
        lng: 30.33
    },
    zoom: 11}
export default Map;