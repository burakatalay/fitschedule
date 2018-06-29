import React from 'react';
import {Autocomplete} from "react-md";

const autocompleteStyle = {width: '20rem', margin: '15px 15px 25px'};

export default class AutocompleteLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {suggestions: [], filterType: Autocomplete.caseInsensitiveFilter, value: ''};
        this.displaySuggestions = this.displaySuggestions.bind(this);
        this.onAutocomplete = this.onAutocomplete.bind(this);
        this.onChange = this.onChange.bind(this);
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
                value={this.state.value}
                dataLabel="description"
                dataValue="place_id"
                filter={this.state.filterType}
            />
        );
    }
}
