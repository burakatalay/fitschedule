import React from 'react';
import {Button, FontIcon, TextField} from "react-md";
import {withRouter} from "react-router-dom";
import LocationSearchField from "./LocationSearchField";

const searchBarStyle = {display: 'flex', justifyContent: 'space-around', alignItems: 'center'};
const textFieldStyle = {width: '20rem'};
const buttonStyle = {verticalAlign: 'bottom'};
const pinStyle = {fontSize: 30};

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {course: '', useGeolocation: true};

        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.locationSubmit = this.locationSubmit.bind(this);
        this.useGeolocation = this.useGeolocation.bind(this);
    }

    handleChangeCourse(value) {
        this.setState({course: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let search = {
            course: this.state.course,
            coord: this.state.coord,
            useGeolocation: this.state.useGeolocation
        };

        this.props.onSubmit(search);
    }

    locationSubmit(value) {
        this.setState({coord: value});
    }

    useGeolocation() {
        this.setState({useGeolocation: !this.state.useGeolocation});
        this.props.useGeolocation();
    }

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
                <Button id="submit" type="submit" style={buttonStyle} raised secondary>Discover</Button>
            </form>
        );
    }
}

export default withRouter(SearchBar);