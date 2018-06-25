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
const selectFieldStyle = {width: '5rem', margin: '15px 15px 25px'};
const buttonStyle = {verticalAlign: 'bottom', margin: 15};
const pinStyle = {fontSize: 30, cursor: 'pointer', margin: 15};
const NUMBER_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {course: '', useGeolocation: true};
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPlacesChanged = this.onPlacesChanged.bind(this);
        this.useGeolocation = this.useGeolocation.bind(this);
        this.handleChangeDistance = this.handleChangeDistance.bind(this);
    }

    handleChangeCourse(value) {
        this.setState({course: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const search = {
            course: this.state.course,
            coord: this.state.coord,
            useGeolocation: this.state.useGeolocation,
            dist: this.state.dist
        };

        this.props.onSubmit(search);
    }

    onPlacesChanged(value) {
        if (value[0] && value[0].geometry && value[0].geometry.location) {
            const coord = {
                lat: value[0].geometry.location.lat(),
                lng: value[0].geometry.location.lng()
            };
            this.setState({coord: coord, useGeolocation: false});
            console.log('[SearchBarComponent] On places changed', coord);
        }
    }

    useGeolocation() {
        this.setState({useGeolocation: true});
    }

    handleChangeDistance(value, index, event, details) {
        this.setState({dist: value});
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
                <AutocompleteLocation onPlacesChanged={(value) => this.onPlacesChanged(value)}/>
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