import React from 'react';
import {FontIcon, Snackbar, TextField} from "react-md";
import {withRouter} from "react-router-dom";
import SearchBar from "./SearchBar";

const mapStyle = {height: '90vh', width: '100%'};

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {toasts: []};
        this.dismissToast = this.dismissToast.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.showError = this.showError.bind(this);
        this.useGeolocation = this.useGeolocation.bind(this);
        this.markAutocompleteLocation = this.markAutocompleteLocation.bind(this);
    }

    componentDidMount() {
        const mapCenter = new google.maps.LatLng(48.1351, 11.5820);
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: mapCenter,
            zoom: 13
        });
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
        const marker = new google.maps.Marker({
            position: geolocation,
            map: this.map,
            title: 'Hello World!'
        });
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

    focusGeolocation() {
        if (this.state.geolocation) {
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

    useGeolocation() {
    }

    onAutocomplete(value) {
        console.log('[MapComponent] Retrieving geometry for place_id', value);
        const request = {
            placeId: value,
            fields: ['geometry']
        };
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.placesService.getDetails(request, this.markAutocompleteLocation);
    }

    markAutocompleteLocation(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log('[MapComponent] Success retrieving geolocation', 'lat', place.geometry.location.lat(), 'lng:', place.geometry.location.lng());
            // createMarker(place);
        } else {
            console.log('[MapComponent] Error retrieving geolocation', place);
        }
    }

    searchSubmit(value) {
        this.props.onSubmit();
    }

    render() {
        return (
            <div>
                <SearchBar useGeolocation={() => this.useGeolocation()}
                           onAutocomplete={(value) => this.onAutocomplete(value)}
                           onSubmit={(value) => this.searchSubmit(value)}/>
                <div id="map" style={mapStyle}>
                </div>
                <Snackbar toasts={this.state.toasts} autohide={true} onDismiss={this.dismissToast}/>
            </div>
        );
    }
}

export default withRouter(Map);

