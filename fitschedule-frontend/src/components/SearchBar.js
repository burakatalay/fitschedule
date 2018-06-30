import React from 'react';
import {Button, FontIcon, SelectField, TextField} from "react-md";
import {withRouter} from "react-router-dom";
import AutocompleteLocation from "./AutocompleteLocation";

const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '4rem',
    position: 'fixed',
    width: '50%',
    right: 0,
    left: 0,
    marginTop: '1rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 1
};
const textFieldStyle = {width: '15rem', margin: '15px 15px 25px'};
const autocompleteStyle = {width: '25rem', margin: '15px 15px 25px'};
const selectFieldStyle = {width: '5rem', margin: '15px 15px 25px'};
const buttonStyle = {verticalAlign: 'bottom', margin: 15};
const pinStyle = {fontSize: 30, cursor: 'pointer', margin: 15};
const NUMBER_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {course: '', dist: 5};
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onAutocomplete = this.onAutocomplete.bind(this);
        this.useGeolocation = this.useGeolocation.bind(this);
        this.handleChangeDistance = this.handleChangeDistance.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
        this.props.distChange(this.state.dist);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    clearLocation() {
        this.autocompleteLocation.clearLocation();
    }

    handleChangeCourse(value) {
        this.setState({course: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const search = {
            course: this.state.course,
            coord: this.state.coord,
            dist: this.state.dist
        };

        this.props.onSubmit(search);
    }

    onAutocomplete(value) {
        this.props.onAutocomplete(value);
    }

    useGeolocation() {
        this.props.useGeolocation();
    }

    handleChangeDistance(value, index, event, details) {
        this.setState({dist: value});
        this.props.distChange(value);
    };

    render() {
        return (
            <form style={searchBarStyle} onSubmit={this.handleSubmit}>
                <TextField
                    style={textFieldStyle}
                    id="courseField"
                    label="Fitness Course"
                    placeholder="Yoga, pilates.."
                    type="text"
                    value={this.state.course}
                    onChange={this.handleChangeCourse}/>
                <AutocompleteLocation style={autocompleteStyle}
                                      onSubmit={(value) => this.onAutocomplete(value)}
                                      onRef={ref => (this.autocompleteLocation = ref)}/>
                <SelectField
                    style={selectFieldStyle}
                    id="distanceField"
                    label="Distance KM"
                    defaultValue={NUMBER_ITEMS[4]}
                    onChange={this.handleChangeDistance}
                    className="md-cell"
                    menuItems={NUMBER_ITEMS}
                />
                <FontIcon primary style={pinStyle} onClick={this.useGeolocation}>my_location</FontIcon>
                <Button id="submit" type="submit" style={buttonStyle} raised secondary>Discover</Button>
            </form>
        );
    }
}

export default withRouter(SearchBar);