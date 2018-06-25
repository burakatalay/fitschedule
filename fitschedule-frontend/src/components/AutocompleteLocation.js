import React from 'react';
import {Autocomplete} from "react-md";

const autocompleteStyle = {width: '15rem', margin: '15px 15px 25px'};

export default class AutocompleteLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {suggestions: [], filterType: Autocomplete.caseInsensitiveFilter};
        this.displaySuggestions = this.displaySuggestions.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    displaySuggestions(predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
        }
        const suggestions = [];
        predictions.forEach(function (prediction) {
            suggestions.push(prediction.description);
        });
        this.setState({
            suggestions: suggestions
        });
        console.log('[AutocompleteLocationComponent] Predictions', predictions);
    }

    componentDidMount() {
        this.service = new google.maps.places.AutocompleteService();
    }

    onChange(value, event) {
        if (value.length) {
            this.service.getPlacePredictions({input: value}, this.displaySuggestions);
        }
    }

    render() {
        return (
            <Autocomplete
                style={autocompleteStyle}
                id="locationField"
                label="Location"
                placeholder="Eg. Marienplatz"
                onChange={this.onChange}
                data={this.state.suggestions}
                filter={this.state.filterType}
            />
        );
    }
}
