import React from 'react';
import {Button, Divider, Drawer, Toolbar} from "react-md";
import ScheduleService from "../services/ScheduleService";
import UserService from "../services/UserService";
import {withRouter} from "react-router-dom";
import Timeslots from "./Timeslots";

const buttonStyle = {marginLeft: '4rem', marginTop: '1rem'};
const courseStyle = {marginLeft: '1rem', marginRight: '1rem', marginTop: '1rem'};
const dividerStyle = {marginBottom: '1rem'};

class SideDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {course: null, visible: false};
        this.handleVisibility = this.handleVisibility.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.addToSchedule = this.addToSchedule.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    handleVisibility(visible) {
        this.setState({visible: visible});
    };

    openDrawer(course) {
        this.setState({visible: true, course: course});
    }

    closeDrawer() {
        this.setState({visible: false});
    };

    addToSchedule() {
        if (!UserService.isAuthenticated()) {
            console.log('[SideDrawerComponent] User is not authenticated');
            this.props.history.push('/login');
        } else {
            ScheduleService.addToSchedule(this.state.course.id)
                .then((data) => {
                    console.log('[SideDrawerComponent] Success adding course to the schedule', data);
                    this.props.addToast('Course has been added to your schedule successfully');
                }, (error) => {
                    console.error('[SideDrawerComponent] Error adding course to the schedule', error);
                    this.props.addToast('Something went wrong. Please try again later.');
                });
        }
    };

    render() {
        const closeBtn = <Button icon onClick={this.closeDrawer}>{'close'}</Button>;
        return (
            <Drawer
                type={Drawer.DrawerTypes.TEMPORARY}
                visible={this.state.visible}
                autoclose={false}
                position="left"
                onVisibilityChange={this.handleVisibility}
                navItems={[]}
                header={
                    this.state.course
                    && <div>
                        <Toolbar
                            actions={closeBtn}
                            title={this.state.course.name}
                            className="md-divider-border md-divider-border--bottom"/>
                        <div style={courseStyle}>
                            <h1>{this.state.course.courseProvider}</h1>
                            <p><strong>Instructor:</strong> {this.state.course.instructor}</p>
                            <Divider style={dividerStyle}/>
                            <Timeslots timeslot={this.state.course.timeslot}/>
                        </div>
                        <Button id="submit"
                                type="submit"
                                style={buttonStyle}
                                onClick={this.addToSchedule}
                                raised
                                primary>Add to Schedule</Button>
                    </div>
                }/>
        );
    }
}

export default withRouter(SideDrawer);

