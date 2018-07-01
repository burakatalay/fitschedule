"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'
import Page from "./Page";
import {ReactAgenda} from 'react-agenda';
import ScheduleService from "../services/ScheduleService";
import UserService from '../services/UserService';
import CourseService from '../services/CourseService';
import {scheduleStyle} from "../css/schedule.css";
import AddReview from './AddReview';

const now = new Date();

const colors = {
    "color-1": "rgba(102, 195, 131 , 1)",
    "color-2": "rgba(242, 177, 52, 1)",
    "color-3": "rgba(235, 85, 59, 1)",
    "color-4": "rgba(70, 159, 213, 1)",
    "color-5": "rgba(170, 59, 123, 1)"
};

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selected: [],
            cellHeight: 30,
            rowsPerHour: 2,
            numberOfDays: 7,
            startDate: new Date(),
            endDate: new Date() + 6,
            courseProvider: null
        };
        this.handleItemEdit = this.handleItemEdit.bind(this);
        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.changeView = this.changeView.bind(this);
    }

    findCourses() {
        ScheduleService.getSchedule()
            .then((schedule) => {
                console.log('[ScheduleComponent] Success getting user schedule', schedule);
                schedule.forEach((course) => {
                    ScheduleService.getCourse(course)
                        .then((course) => {
                            console.log('[ScheduleComponent] Success getting a course from user schedule', course)
                            const courses = this.state.items;
                            for (let i = 0; i < course.timeslot.length; i++) {
                                for (let j = 0; j < 4; j++) {
                                    const startTime = new Date(course.timeslot[i].start);
                                    const endTime = new Date(course.timeslot[i].end);
                                    const currentDay = startTime.getDay() - 1;
                                    const day = course.timeslot[i].day;
                                    let dayDifference = (day + 7 - currentDay) % 7;
                                    startTime.setDate(startTime.getDate() + (7 * j) + dayDifference);
                                    endTime.setDate(endTime.getDate() + (7 * j) + dayDifference);
                                    let c = {
                                        "_id": course._id,
                                        "name": course.name,
                                        "courseProvider": course.courseprovider,
                                        "startDateTime": new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours(), startTime.getMinutes()),
                                        "endDateTime": new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), endTime.getHours(), endTime.getMinutes()),
                                        "classes": "color-1"
                                    };
                                    courses.push(c);
                                    this.setState({items: courses});
                                }
                            }
                        });
                });
            }).catch((e) => {
            console.error('[ScheduleComponent] Error getting course providers', e);
        });
    }

    deleteCourse(item) {
        if (item.courseProvider === this.state.courseProvider) {
            CourseService.deleteCourse(item._id)
                .then(() => {
                    console.log('[ScheduleComponent] Success deleting course from the database');
                }, (error) => {
                    console.error('[ScheduleComponent] Error deleting course from the database', error);
                });
        } else {
            ScheduleService.deleteCourse(item._id)
                .then(() => {
                    console.log('[ScheduleComponent] Success removing course from the schedule');
                }, (error) => {
                    console.error('[ScheduleComponent] Error removing course from the schedule', error);
                });
        }
    }

    //This method will fetch everytime user goes to schedule
    componentDidMount() {
        this.findCourses();
        UserService.whoami().then((data) => {
            console.log('[ScheduleComponent] Success whoami', data);
            if (data.courseProvider) {
                this.setState({courseProvider: data.courseProvider});
            }
        }, (error) => {
            console.log('[ScheduleComponent] Error whoami', error);
        });
        console.log('[ScheduleComponent] componentDidMount state', this.state);
    }

    componentWillReceiveProps(next, last) {
        console.log("componentWillReceiveProps");
        console.log(next);
        if (next.items) {
            this.setState({items: next.items});
        }
    }

    handleItemEdit(item, openModal) {
        console.log('[ScheduleComponent] Handle item edit', item);
        if (item) {
            this._openModal(item._id);
        }
    }

    _openModal(id) {
        this.addReview.show(id);
    }

    _closeModal(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.addReview.hide();
    }

    removeEvent(items, item) {
        this.deleteCourse(item);
        this.setState({items: items});
    }

    editEvent(items, item) {
        console.log("editEvent");
        this.setState({selected: []});
        this._closeModal();
    }

    changeView(days, event) {
        this.setState({numberOfDays: days});
    }

    render() {
        return (
            <Page>
                <div style={scheduleStyle}>
                    <div className="content-expanded">
                        <ReactAgenda
                            minDate={new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30)}
                            maxDate={new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30)}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            startAtTime={10}
                            cellHeight={this.state.cellHeight}
                            items={this.state.items}
                            numberOfDays={this.state.numberOfDays}
                            headFormat={"ddd DD MMM"}
                            rowsPerHour={this.state.rowsPerHour}
                            itemColors={colors}
                            autoScale={false}
                            fixedHeader={true}
                            onItemEdit={this.handleItemEdit}
                            onItemRemove={this.removeEvent}/>
                        <AddReview onRef={ref => (this.addReview = ref)}/>
                    </div>
                </div>
            </Page>
        );
    }
}

export default withRouter(Schedule);