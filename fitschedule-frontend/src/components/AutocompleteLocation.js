import React from 'react';
import {Autocomplete} from "react-md";

const autocompleteStyle = {width: '15rem', margin: '15px 15px 25px'};

export default class AutocompleteLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {suggestions: [], filterType: Autocomplete.caseInsensitiveFilter};
        this.displaySuggestions = this.displaySuggestions.bind(this);
        this.onAutocomplete = this.onAutocomplete.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    displaySuggestions(predictions, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
        }
        this.setState({
            suggestions: predictions
        });
        console.log('[AutocompleteLocationComponent] New predictions', predictions);
    }

    componentDidMount() {
        this.autocompleteService = new google.maps.places.AutocompleteService();
    }

    onChange(value, event) {
        if (value.length) {
            this.autocompleteService.getPlacePredictions({input: value}, this.displaySuggestions);
        }
    }

    onAutocomplete(suggestion, suggestionIndex, matches) {
        console.log('[AutocompleteLocationComponent] Autocomplete selected for location with place_id', suggestion);
        this.props.onAutocomplete(suggestion);
    }

    render() {
        return (
            <Autocomplete
                style={autocompleteStyle}
                id="locationField"
                label="Location"
                placeholder="Eg. Marienplatz"
                onAutocomplete={this.onAutocomplete}
                onChange={this.onChange}
                data={this.state.suggestions}
                dataLabel="description"
                dataValue="place_id"
                filter={this.state.filterType}
            />
        );
    }
}
