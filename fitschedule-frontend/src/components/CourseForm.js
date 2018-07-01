import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardText,
    Checkbox,
    DataTable,
    DatePicker,
    TableBody,
    TableColumn,
    TableHeader,
    TableRow,
    TextField,
    TimePicker
} from 'react-md';
import {withRouter} from 'react-router-dom'
import Page from './Page';
import AutocompleteLocation from "./AutocompleteLocation";
import {AlertMessage} from "./AlertMessage";
import CourseService from "../services/CourseService";

const pickerColumnStyle = {display: 'flex', justifyContent: 'space-around', width: '40rem'};
const rowStyle = {display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'};
const labelStyle = {paddingTop: '1.5rem'};
const style = {maxWidth: 700, marginBottom: '4rem', marginTop: '2rem'};
const timePickerStyle = {width: '100%'};

class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            instructor: "",
            lat: null,
            lng: null,
            mondayStart: null,
            mondayEnd: null,
            tuesdayStart: null,
            tuesdayEnd: null,
            wednesdayStart: null,
            wednesdayEnd: null,
            thursdayStart: null,
            thursdayEnd: null,
            fridayStart: null,
            fridayEnd: null,
            saturdayStart: null,
            saturdayEnd: null,
            sundayStart: null,
            sundayEnd: null,
            error: null
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeInstructor = this.handleChangeInstructor.bind(this);
        this.autocompleteSubmit = this.autocompleteSubmit.bind(this);
        this.handleChangeStartMonday = this.handleChangeStartMonday.bind(this);
        this.handleChangeEndMonday = this.handleChangeEndMonday.bind(this);
        this.handleChangeStartTuesday = this.handleChangeStartTuesday.bind(this);
        this.handleChangeEndTuesday = this.handleChangeEndTuesday.bind(this);
        this.handleChangeStartWednesday = this.handleChangeStartWednesday.bind(this);
        this.handleChangeEndWednesday = this.handleChangeEndWednesday.bind(this);
        this.handleChangeStartThursday = this.handleChangeStartThursday.bind(this);
        this.handleChangeEndThursday = this.handleChangeEndThursday.bind(this);
        this.handleChangeStartFriday = this.handleChangeStartFriday.bind(this);
        this.handleChangeEndFriday = this.handleChangeEndFriday.bind(this);
        this.handleChangeStartSaturday = this.handleChangeStartSaturday.bind(this);
        this.handleChangeEndSaturday = this.handleChangeEndSaturday.bind(this);
        this.handleChangeStartSunday = this.handleChangeStartSunday.bind(this);
        this.handleChangeEndSunday = this.handleChangeEndSunday.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(value) {
        this.setState({name: value});
    }

    handleChangeInstructor(value) {
        this.setState({instructor: value});
    }

    handleChangeStartMonday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Monday start time', start);
        this.setState({
            mondayStart: start
        });
    }

    handleChangeEndMonday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Monday end time', end);
        this.setState({
            mondayEnd: end
        });
    }

    handleChangeStartTuesday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Tuesday start time', start);
        this.setState({
            tuesdayStart: start
        });
    }

    handleChangeEndTuesday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Tuesday end time', end);
        this.setState({
            tuesdayEnd: end
        });
    }

    handleChangeStartWednesday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Wednesday start time', start);
        this.setState({
            wednesdayStart: start
        });
    }

    handleChangeEndWednesday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Wednesday end time', end);
        this.setState({
            wednesdayEnd: end
        });
    }

    handleChangeStartThursday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Thursday start time', start);
        this.setState({
            thursdayStart: start
        });
    }

    handleChangeEndThursday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Thursday end time', end);
        this.setState({
            thursdayEnd: end
        });
    }

    handleChangeStartFriday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Friday start time', start);
        this.setState({
            fridayStart: start
        });
    }

    handleChangeEndFriday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Friday end time', end);
        this.setState({
            fridayEnd: end
        });
    }

    handleChangeStartSaturday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Saturday start time', start);
        this.setState({
            saturdayStart: start
        });
    }

    handleChangeEndSaturday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Saturday end time', end);
        this.setState({
            saturdayEnd: end
        });
    }

    handleChangeStartSunday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Sunday start time', start);
        this.setState({
            sundayStart: start
        });
    }

    handleChangeEndSunday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Sunday end time', end);
        this.setState({
            sundayEnd: end
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const timeslot = [];
        if (this.state.mondayStart && this.state.mondayEnd) {
            const monday = {
                day: 0,
                start: this.state.mondayStart,
                end: this.state.mondayEnd
            };
            timeslot.push(monday);
        }
        if (this.state.tuesdayStart && this.state.tuesdayEnd) {
            const tuesday = {
                day: 1,
                start: this.state.tuesdayStart,
                end: this.state.tuesdayEnd
            };
            timeslot.push(tuesday);
        }
        if (this.state.wednesdayStart && this.state.wednesdayEnd) {
            const wednesday = {
                day: 2,
                start: this.state.wednesdayStart,
                end: this.state.wednesdayEnd
            };
            timeslot.push(wednesday);
        }
        if (this.state.thursdayStart && this.state.thursdayEnd) {
            const thursday = {
                day: 3,
                start: this.state.thursdayStart,
                end: this.state.thursdayEnd
            };
            timeslot.push(thursday);
        }
        if (this.state.fridayStart && this.state.fridayEnd) {
            const friday = {
                day: 4,
                start: this.state.fridayStart,
                end: this.state.fridayEnd
            };
            timeslot.push(friday);
        }
        if (this.state.saturdayStart && this.state.saturdayEnd) {
            const saturday = {
                day: 5,
                start: this.state.saturdayStart,
                end: this.state.saturdayEnd
            };
            timeslot.push(saturday);
        }
        if (this.state.sundayStart && this.state.sundayEnd) {
            const sunday = {
                day: 6,
                start: this.state.sundayStart,
                end: this.state.sundayEnd
            };
            timeslot.push(sunday);
        }
        if (timeslot.length === 0) {
            this.setState({error: 'Please select a time-slot for the course'});
            console.log('[CourseForm] Empty timeslot', timeslot);
        } else {
            const course = {
                name: this.state.name,
                lng: this.state.lng,
                lat: this.state.lat,
                instructor: this.state.instructor,
                timeslot: timeslot
            };
            console.log('[CourseForm] Creating new course', course);
            CourseService.createCourse(course)
                .then((course) => {
                    console.log('[CourseFormComponent] Success creating course', course);
                    this.props.history.push('/schedule');
                }, (error) => {
                    console.log('[CourseFormComponent] Error creating course', error);
                });
        }

    }

    autocompleteSubmit(value) {
        this.setState({lat: value.lat, lng: value.lng});
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <form onSubmit={this.handleSubmit}>
                        <CardText>
                            <div className="md-grid">
                                <TextField
                                    label="Course Name"
                                    id="CourseNameField"
                                    type="text"
                                    required
                                    value={this.state.name}
                                    onChange={this.handleChangeName}
                                    errorText="Please enter a course name"/>
                                <TextField
                                    label="Instructor Name"
                                    id="InstructorNameField"
                                    type="text"
                                    required
                                    value={this.state.instructor}
                                    onChange={this.handleChangeInstructor}
                                    errorText="Please enter course instructor's name"/>
                                <AutocompleteLocation onRef={ref => (this.autocompleteLocation = ref)}
                                                      required={true}
                                                      onSubmit={(value) => this.autocompleteSubmit(value)}/>
                                <div style={rowStyle}>
                                    <div style={labelStyle}>
                                        Monday:
                                    </div>
                                    <div style={pickerColumnStyle}>
                                        <TimePicker
                                            id="MondayStartField"
                                            label="Start Time"
                                            onChange={this.handleChangeStartMonday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                        <TimePicker
                                            id="MondayEndField"
                                            label="End Time"
                                            onChange={this.handleChangeEndMonday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                    </div>
                                </div>
                                <div style={rowStyle}>
                                    <div style={labelStyle}>
                                        Tuesday:
                                    </div>
                                    <div style={pickerColumnStyle}>
                                        <TimePicker
                                            id="TuesdayStartField"
                                            label="Start Time"
                                            onChange={this.handleChangeStartTuesday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                        <TimePicker
                                            id="TuesdayEndField"
                                            label="End Time"
                                            onChange={this.handleChangeEndTuesday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                    </div>
                                </div>
                                <div style={rowStyle}>
                                    <div style={labelStyle}>
                                        Wednesday:
                                    </div>
                                    <div style={pickerColumnStyle}>
                                        <TimePicker
                                            id="WednesdayStartField"
                                            label="Start Time"
                                            onChange={this.handleChangeStartWednesday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                        <TimePicker
                                            id="WednesdayEndField"
                                            label="End Time"
                                            onChange={this.handleChangeEndWednesday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                    </div>
                                </div>
                                <div style={rowStyle}>
                                    <div style={labelStyle}>
                                        Thursday:
                                    </div>
                                    <div style={pickerColumnStyle}>
                                        <TimePicker
                                            id="ThursdayStartField"
                                            label="Start Time"
                                            onChange={this.handleChangeStartThursday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                        <TimePicker
                                            id="ThursdayEndField"
                                            label="End Time"
                                            onChange={this.handleChangeEndThursday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                    </div>
                                </div>
                                <div style={rowStyle}>
                                    <div style={labelStyle}>
                                        Friday:
                                    </div>
                                    <div style={pickerColumnStyle}>
                                        <TimePicker
                                            id="FridayStartField"
                                            label="Start Time"
                                            onChange={this.handleChangeStartFriday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                        <TimePicker
                                            id="FridayEndField"
                                            label="End Time"
                                            onChange={this.handleChangeEndFriday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                    </div>
                                </div>
                                <div style={rowStyle}>
                                    <div style={labelStyle}>
                                        Saturday:
                                    </div>
                                    <div style={pickerColumnStyle}>
                                        <TimePicker
                                            id="SaturdayStartField"
                                            label="Start Time"
                                            onChange={this.handleChangeStartSaturday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                        <TimePicker
                                            id="SaturdayEndField"
                                            label="End Time"
                                            onChange={this.handleChangeEndSaturday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                    </div>
                                </div>
                                <div style={rowStyle}>
                                    <div style={labelStyle}>
                                        Sunday:
                                    </div>
                                    <div style={pickerColumnStyle}>
                                        <TimePicker
                                            id="SundayStartField"
                                            label="Start Time"
                                            onChange={this.handleChangeStartSunday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                        <TimePicker
                                            id="SundayEndField"
                                            label="End Time"
                                            onChange={this.handleChangeEndSunday}
                                            style={timePickerStyle}
                                            className="md-cell"/>
                                    </div>
                                </div>
                            </div>
                        </CardText>
                        <CardActions>
                            <AlertMessage
                                className="md-row md-full-width">{this.state.error ? `${this.state.error}` : ''}</AlertMessage>
                            <Button id="submit" type="submit"
                                    raised primary className="md-cell--right">Create</Button>
                        </CardActions>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(CourseForm);