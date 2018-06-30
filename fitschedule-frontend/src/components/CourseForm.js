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

const rowStyle = {display: 'flex', alignItems: 'center', width: '100%'};
const spanStyle = {display: 'flex', width: '20rem', paddingTop: '1.5rem'};
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
            monday: null,
            tuesday: null,
            wednesday: null,
            thursday: null,
            friday: null,
            saturday: null,
            sunday: null,
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
            monday: {
                start: start
            }
        });
    }

    handleChangeEndMonday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Monday end time', end);
        this.setState({
            monday: {
                end: end
            }
        });
    }

    handleChangeStartTuesday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Tuesday start time', start);
        this.setState({
            tuesday: {
                start: start
            }
        });
    }

    handleChangeEndTuesday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Tuesday end time', end);
        this.setState({
            tuesday: {
                end: end
            }
        });
    }

    handleChangeStartWednesday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Wednesday start time', start);
        this.setState({
            wednesday: {
                start: start
            }
        });
    }

    handleChangeEndWednesday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Wednesday end time', end);
        this.setState({
            wednesday: {
                end: end
            }
        });
    }

    handleChangeStartThursday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Thursday start time', start);
        this.setState({
            thursday: {
                start: start
            }
        });
    }

    handleChangeEndThursday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Thursday end time', end);
        this.setState({
            thursday: {
                end: end
            }
        });
    }

    handleChangeStartFriday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Friday start time', start);
        this.setState({
            friday: {
                start: start
            }
        });
    }

    handleChangeEndFriday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Friday end time', end);
        this.setState({
            friday: {
                end: end
            }
        });
    }

    handleChangeStartSaturday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Saturday start time', start);
        this.setState({
            saturday: {
                start: start
            }
        });
    }

    handleChangeEndSaturday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Saturday end time', end);
        this.setState({
            saturday: {
                end: end
            }
        });
    }

    handleChangeStartSunday(timeString, dateObject, event) {
        const start = new Date(dateObject);
        console.log('[CourseForm] Sunday start time', start);
        this.setState({
            sunday: {
                start: start
            }
        });
    }

    handleChangeEndSunday(timeString, dateObject, event) {
        const end = new Date(dateObject);
        console.log('[CourseForm] Sunday end time', end);
        this.setState({
            sunday: {
                end: end
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const timeslot = [];
        if (this.state.monday && this.state.monday.start && this.state.monday.end) {
            const monday = {
                day: 0,
                start: this.state.monday.start,
                end: this.state.monday.end
            };
            timeslot.push(monday);
        }
        if (this.state.tuesday && this.state.tuesday.start && this.state.tuesday.end) {
            const tuesday = {
                day: 1,
                start: this.state.tuesday.start,
                end: this.state.tuesday.end
            };
            timeslot.push(tuesday);
        }
        if (this.state.wednesday && this.state.wednesday.start && this.state.wednesday.end) {
            const wednesday = {
                day: 2,
                start: this.state.wednesday.start,
                end: this.state.wednesday.end
            };
            timeslot.push(wednesday);
        }
        if (this.state.thursday && this.state.thursday.start && this.state.thursday.end) {
            const thursday = {
                day: 3,
                start: this.state.thursday.start,
                end: this.state.thursday.end
            };
            timeslot.push(thursday);
        }
        if (this.state.friday && this.state.friday.start && this.state.friday.end) {
            const friday = {
                day: 4,
                start: this.state.friday.start,
                end: this.state.friday.end
            };
            timeslot.push(friday);
        }
        if (this.state.saturday && this.state.saturday.start && this.state.saturday.end) {
            const saturday = {
                day: 5,
                start: this.state.saturday.start,
                end: this.state.saturday.end
            };
            timeslot.push(saturday);
        }
        if (this.state.sunday && this.state.sunday.start && this.state.sunday.end) {
            const sunday = {
                day: 6,
                start: this.state.sunday.start,
                end: this.state.sunday.end
            };
            timeslot.push(sunday);
        }
        if (timeslot.length === 0) {
            this.setState({error: 'Please select a time-slot for the course'});
            console.log('[CourseForm] Empty timeslot', timeslot);
        } else {
            const course = {
                name: this.state.name,
                location: {
                    coordinates: [this.state.lng, this.state.lat]
                },
                instructor: this.state.instructor,
                timeslot: timeslot
            };
            console.log('[CourseForm] Creating new course', course);
            // CourseService.createCourse(course)
            //     .then((course) => {
            //         console.log('[CourseFormComponent] Success creating course', course);
            //     }, (error) => {
            //         console.log('[CourseFormComponent] Error creating course', error);
            //     });
        }

    }

    inputCheck() {
        // TODO: IMPLEMENT INPUT CHECK
        return false;
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
                                    <span style={spanStyle}>
                                        Monday:
                                    </span>
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
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Tuesday:
                                    </span>
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
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Wednesday:
                                    </span>
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
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Thursday:
                                    </span>
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
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Friday:
                                    </span>
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
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Saturday:
                                    </span>
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
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Sunday:
                                    </span>
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