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
            sunday: null
        };
        this.autocompleteSubmit = this.autocompleteSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
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
        this.handleChangeInstructor = this.handleChangeInstructor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(timeString, dateObject, event) {
        this.setState({name: value});
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

    handleChangeStart(value) {
        console.log(value);
        const startTime = new Date();
        startTime.setHours(value.substring(0, 2));
        startTime.setMinutes(value.substring(3, 5))
        console.log(startTime);
        this.setState({start: startTime});
    }

    handleChangeEnd(value) {
        const endTime = new Date();
        endTime.setHours(value.substring(0, 2));
        endTime.setMinutes(value.substring(3, 5))
        console.log(endTime);
        if (this.state.start.getTime() >= endTime) {
            console.log('end time should be later than start time')
        } else {
            console.log('times do match');
            this.setState({end: endTime});
        }

    }

    handleChangeInstructor(value) {
        this.setState({instructor: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.inputCheck()) {
            const course = {
                name: this.state.name,
                location: {
                    coordinates: [this.state.lng, this.state.lat]
                },
                instructor: this.state.instructor,
                timeslot: this.state.timeslot
            };
            CourseService.createCourse(course)
                .then((course) => {
                    console.log('[CourseFormComponent] Success creating course', course);
                }, (error) => {
                    console.log('[CourseFormComponent] Error creating course', error);
                });
        } else {
            console.log('[CourseFormComponent] Missing inputs');
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
                                        id="StartField"
                                        label="Start Time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeStartMonday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                    <TimePicker
                                        id="EndField"
                                        label="End Time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeEndMonday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                </div>
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Tuesday:
                                    </span>
                                    <TimePicker
                                        id="StartField"
                                        label="Course start time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeStartTuesday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                    <TimePicker
                                        id="EndField"
                                        label="Course end time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeEndTuesday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                </div>
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Wednesday:
                                    </span>
                                    <TimePicker
                                        id="StartField"
                                        label="Course start time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeStartWednesday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                    <TimePicker
                                        id="EndField"
                                        label="Course end time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeEndWednesday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                </div>
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Thursday:
                                    </span>
                                    <TimePicker
                                        id="StartField"
                                        label="Course start time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeStartThursday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                    <TimePicker
                                        id="EndField"
                                        label="Course end time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeEndThursday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                </div>
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Friday:
                                    </span>
                                    <TimePicker
                                        id="StartField"
                                        label="Course start time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeStartFriday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                    <TimePicker
                                        id="EndField"
                                        label="Course end time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeEndFriday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                </div>
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Saturday:
                                    </span>
                                    <TimePicker
                                        id="StartField"
                                        label="Course start time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeStartSaturday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                    <TimePicker
                                        id="EndField"
                                        label="Course end time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeEndSaturday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                </div>
                                <div style={rowStyle}>
                                    <span style={spanStyle}>
                                        Sunday:
                                    </span>
                                    <TimePicker
                                        id="StartField"
                                        label="Course start time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeStartSunday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                    <TimePicker
                                        id="EndField"
                                        label="Course end time"
                                        locales="da-DK"
                                        outline
                                        onChange={this.handleChangeEndSunday}
                                        style={timePickerStyle}
                                        className="md-cell"/>
                                </div>
                            </div>
                        </CardText>
                        <CardActions>
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