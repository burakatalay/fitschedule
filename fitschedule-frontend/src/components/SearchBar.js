import React from 'react';
import {Button, FontIcon, SelectField, TextField} from "react-md";
import {withRouter} from "react-router-dom";
import LocationSearchField from "./LocationSearchField";

const searchBarStyle = {display: 'flex', justifyContent: 'space-around', alignItems: 'center'};
const textFieldStyle = {width: '20rem'};
const buttonStyle = {verticalAlign: 'bottom'};
const pinStyle = {fontSize: 30, cursor: 'pointer'};
const NUMBER_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {course: '', useGeolocation: true};
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.locationSubmit = this.locationSubmit.bind(this);
        this.useGeolocation = this.useGeolocation.bind(this);
        this.handleChangeDistance = this.handleChangeDistance.bind(this);
    }

    handleChangeCourse(value) {
        this.setState({course: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let search = {
            course: this.state.course,
            coord: this.state.coord,
            useGeolocation: this.state.useGeolocation,
            dist: this.state.dist
        };

        this.props.onSubmit(search);
    }

    locationSubmit(value) {
        this.setState({coord: value, useGeolocation: false});
    }

    useGeolocation() {
        this.setState({useGeolocation: true});
        this.props.useGeolocation();
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
                    type="text"
                    value={this.state.course}
                    onChange={this.handleChangeCourse}/>
                <LocationSearchField onSubmit={(value) => this.locationSubmit(value)}/>
                <FontIcon primary style={pinStyle} onClick={this.useGeolocation}>my_location</FontIcon>
                <SelectField
                    id="distanceField"
                    label="Distance in KM"
                    placeholder="Placeholder"
                    onChange={this.handleChangeDistance}
                    className="md-cell"
                    menuItems={NUMBER_ITEMS}
                />
                <Button id="submit" type="submit" style={buttonStyle} raised secondary>Discover</Button>
            </form>
        );
    }
}

export default withRouter(SearchBar);