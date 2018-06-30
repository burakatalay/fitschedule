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

const style = {maxWidth: 700, marginBottom: '4rem', marginTop: '2rem'};
const timePickerStyle = {width: '10rem'};
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            instructor: "",
            lat: null,
            lng: null,
            timeslot: []
        };
        this.autocompleteSubmit = this.autocompleteSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleSelectDay = this.handleSelectDay.bind(this);
        this.handleChangeInstructor = this.handleChangeInstructor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(value) {
        this.setState({name: value});
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
            const notmatch = new unmatched()
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
                                                    label="Course start time"
                                                    locales="da-DK"
                                                    outline
                                                    onChange={this.handleChangeStart}
                                                    style={timePickerStyle}
                                                    className="md-cell"/>
                                            </TableColumn>
                                            <TableColumn>
                                                <TimePicker
                                                    id="EndField"
                                                    label="Course end time"
                                                    locales="da-DK"
                                                    outline
                                                    onChange={this.handleChangeEnd}
                                                    style={timePickerStyle}
                                                    className="md-cell"/>
                                            </TableColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </DataTable>
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