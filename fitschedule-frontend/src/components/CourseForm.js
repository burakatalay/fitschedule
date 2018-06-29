"use strict";

import React from 'react';
import { Card, Button, FontIcon, TextField, SelectField, TimePicker, DatePicker, Autocomplete, DataTable,
        TableHeader, TableBody, TableRow, TableColumn, Checkbox } from 'react-md';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import { AlertMessage } from './AlertMessage';
import Page from './Page';

const autocompleteStyle = {width: '15rem', margin: '15px 15px 25px'};

const style = { maxWidth: 800, maxHeight: 'auto' };
const insidestyle = { width: 200};
const datepickerstyle = { width: 200};
const buttonstyle = { width: 115};
/*const endtime = new Date;
end.setMinute(start.getMinute() + 1);
end.setMinute(start.getMinute() + 1);
const hours = ['06:00', '06:30', '07:00', '07:30','08:00', '08:30', '09:00', '09:30', 
               '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
               '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
               '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
               '22:00', '22:30', '23:00', '23:30', '24:00', '00:30', '01:00', '01:30',];
*/
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


class CourseForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            instructor: "",
            lat: "",
            lng: "",
            timeslot: [],

        }
        this.state = {suggestions: [], filterType: Autocomplete.caseInsensitiveFilter};
        this.displaySuggestions = this.displaySuggestions.bind(this);
        this.onAutocomplete = this.onAutocomplete.bind(this);
        this.onChange = this.onChange.bind(this);

        



        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleSelectDay = this.handleSelectDay.bind(this);
        this.handleChangeInstructor = this.handleChangeInstructor.bind(this);
        this.handleChangeLat = this.handleChangeLat.bind(this);
        this.handleChangeLng = this.handleChangeLng.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(value) {
        this.setState({name: value});
    }

    handleChangeStart(value) {
        console.log(value);
        const startTime = new Date();
        startTime.setHours(value.substring(0,2));
        startTime.setMinutes(value.substring(3,5))
        console.log(startTime);
        this.setState({start: startTime});
    }

    handleChangeEnd(value) {
        const endTime = new Date();
        endTime.setHours(value.substring(0,2));
        endTime.setMinutes(value.substring(3,5))
        console.log(endTime);
        if(this.state.start.getTime() >= endTime) {

            console.log('end time should be later than start time')
            const notmatch= new unmatched()
        } else {
             console.log('times do match');
            this.setState({end: endTime});
        }

    }


    handleSelectDay(value) {
        const timeslot = this.state.timeslot;
        const time = {}
        console.log(value);
        this.setState({day: value});
    }

    handleChangeInstructor(value) {
        this.setState({instructor: value});
    }

    handleChangeLat(value) {
        this.setState({lat: value});
    }

    handleChangeLng(value) {
        this.setState({lng: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let course = this.props.course;
        if(course == undefined) {
            course = {};
        }

        course.name = this.state.name;
        course.start = this.state.start;
        course.end = this.state.end;
        course.day = this.state.day;
        course.instructor = this.state.instructor;
        course.lng = this.state.lng;
        course.lat = this.state.lat;

        this.props.onSubmit(course);
    }

    displaySuggestions(predictions, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
        }
        this.setState({
            suggestions: predictions
        });
        console.log('[CourseFormComponent] New predictions', predictions);
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
        console.log('[CourseFormComponent] Autocomplete selected for location with place_id', suggestion);
        this.props.onAutocomplete(suggestion);
    }

    render() {
        return(
            <Page>
             <Card style={style} className="md-block-centered">
                <div className="md-grid">
                    
                    <TextField
                            label="Course Name"
                            id="NameField"
                            type="text"
                            className="md-block-left"
                            required
                            style={insidestyle}
                            value={this.state.name}
                            onChange={this.handleChangeName}
                            errorText="Please enter a name"/>
                    <Autocomplete
                            style={autocompleteStyle}
                            id="locationField"
                            className="md-block-right"
                            required
                            label="Location"
                            placeholder="Eg. Marienplatz"
                            onAutocomplete={this.onAutocomplete}
                            onChange={this.onChange}
                            data={this.state.suggestions}
                            dataLabel="description"
                            dataValue="place_id"
                            filter={this.state.filterType}/>
                </div> 
                    
                    <DataTable plain>
                        <TableHeader>
                            <TableRow>
                                <TableColumn>Day</TableColumn>
                                <TableColumn>Start Time</TableColumn>
                                <TableColumn>End Time</TableColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from(Array(7)).map((_, i) => (
                            <TableRow key={i}>
                                <TableColumn>
                                    <Checkbox
                                        id="checkbox-Day"
                                        name="day-checkboxes[]"
                                        label={days[i]}
                                        type="checkbox"
                                        value={i}
                                        onChange={this.handleSelectDay}/>
                                
                                </TableColumn>
                                <TableColumn>
                                    <TimePicker
                                        id="StartField"
                                        label="Select a course start time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeStart}
                                        style={datepickerstyle}
                                        className="md-cell"/>
                                </TableColumn>
                                <TableColumn>
                                    <TimePicker
                                        id="EndField"
                                        label="Select a course end time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeEnd}
                                        style={datepickerstyle}
                                        className="md-cell"/>
                                </TableColumn>
                            </TableRow>
                        ))}
                        </TableBody>
                                
                          
                        
                    </DataTable>
                    <Button id="submit" type="submit"
                                disabled={this.state.name == undefined || this.state.name == '' || this.state.start == undefined || this.state.start == '' 
                                || this.state.end == undefined || this.state.end == '' || this.state.instructor == undefined || this.state.instructor == '' 
                                || this.state.lng == undefined || this.state.lng == '' || this.state.lat == undefined || this.state.lat == ''
                                || this.state.day == undefined || this.state.day == '' || this.state.end == this.state.start}
                                raised primary className="md-cell md-cell--2">Create</Button>
                        
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>

                 </Card>
            </Page>


        );
    }

    /*
    render() {
        return ( 
            <Page>
                <Card style={style} className="md-block-centered">
            
                    <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        
                        <TextField
                            label="Course Name"
                            id="NameField"
                            type="text"
                            className="md-row"
                            required
                            style={insidestyle}
                            value={this.state.name}
                            onChange={this.handleChangeName}
                            errorText="Please enter a name"/>
                        <TimePicker
                            id="StartField"
                            label="Select a course start time"
                            locales="da-DK"
                            inline
                            required
                            onChange={this.handleChangeStart}
                            style={datepickerstyle}
                            className="md-cell"/>
                        <TimePicker
                            id="EndField"
                            label="Select a course end time"
                            locales="da-DK"
                            inline
                            required
                            onChange={this.handleChangeEnd}
                            style={datepickerstyle}
                            helpText="Please enter a later time than start time"
                            className="md-cell"/>
                        <SelectField
                            id="DayField"
                            label="Course Day"
                            placeholder="Course Day"
                            className="md-cell"
                            menuItems={days}
                            onChange={this.handleChangeDay}
                            required/> 
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
                            filter={this.state.filterType}/>      
                        <Button id="submit" type="submit"
                                disabled={this.state.name == undefined || this.state.name == '' || this.state.start == undefined || this.state.start == '' 
                                || this.state.end == undefined || this.state.end == '' || this.state.instructor == undefined || this.state.instructor == '' 
                                || this.state.lng == undefined || this.state.lng == '' || this.state.lat == undefined || this.state.lat == ''
                                || this.state.day == undefined || this.state.day == '' || this.state.end == this.state.start}
                                raised primary className="md-cell md-cell--2">Create</Button>
                        
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                    
                </Card>
            </Page>
        );
    }

    */
}


export default withRouter(CourseForm);