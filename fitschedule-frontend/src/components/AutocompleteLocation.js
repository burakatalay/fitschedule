import React from 'react';
import {Autocomplete} from "react-md";

const hidden = {display: 'none'};
const containerStyle = {width: '100%'};
const autocompleteStyle = {marginBottom: '1rem'};

export default class AutocompleteLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {suggestions: [], filterType: Autocomplete.caseInsensitiveFilter, value: ''};
        this.displaySuggestions = this.displaySuggestions.bind(this);
        this.onAutocomplete = this.onAutocomplete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.markAutocompleteLocation = this.markAutocompleteLocation.bind(this);
    }

    displaySuggestions(predictions, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        }
        this.setState({
            suggestions: predictions
        });
        console.log('[AutocompleteLocationComponent] New predictions', predictions);
    }

    componentDidMount() {
        this.props.onRef(this);
        const mapCenter = new google.maps.LatLng(48.1351, 11.5820);
        this.map = new google.maps.Map(document.getElementById('hiddenMap'), {
            center: mapCenter,
            zoom: 13
        });
        this.autocompleteService = new google.maps.places.AutocompleteService();
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    clearLocation() {
        this.setState({
            value: ''
        });
    }

    onChange(value, event) {
        this.setState({
            value: value
        });
        if (value.length) {
            this.autocompleteService.getPlacePredictions({input: value}, this.displaySuggestions);
        }
    }

    onAutocomplete(suggestion, suggestionIndex, matches) {
        console.log('[AutocompleteLocationComponent] Autocomplete selected for location with place_id', suggestion);
        this.setState({
            value: this.state.suggestions[suggestionIndex].description
        });
        const request = {
            placeId: suggestion,
            fields: ['geometry']
        };
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.placesService.getDetails(request, this.markAutocompleteLocation);
    }

    markAutocompleteLocation(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log('[AutocompleteLocationComponent] Success retrieving geolocation',
                'lat', place.geometry.location.lat(), 'lng:', place.geometry.location.lng());
            const geolocation = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            this.props.onSubmit(geolocation);
        } else {
            console.log('[AutocompleteLocationComponent] Error retrieving geolocation', place);
        }
    }

    render() {
        return (
            <div style={containerStyle}>
                <Autocomplete
                    style={autocompleteStyle}
                    id="locationField"
                    label="Location"
                    placeholder="Eg. Marienplatz"
                    onAutocomplete={this.onAutocomplete}
                    required={this.props.required}
                    onChange={this.onChange}
                    data={this.state.suggestions}
                    value={this.state.value}
                    dataLabel="description"
                    dataValue="place_id"
                    filter={this.state.filterType}/>
                <div id="hiddenMap" style={hidden}></div>
            </div>
        );
    }
}
