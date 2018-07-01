import React from 'react';
import {Button, DialogContainer, TextField} from 'react-md';
import CourseService from '../services/CourseService';
import ScheduleService from "../services/ScheduleService";

export default class ConfirmAction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            item: null,
            courseProvider: null
        };

        this.onClick = this.onClick.bind(this);
        this.hide = this.hide.bind(this);
        
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    onClick() {
        console.log("clicked");
        console.log(this.state.item.courseProvider);
        if (this.state.item.courseProvider === this.state.courseProvider) {
            CourseService.deleteCourse(this.state.item._id)
                .then(() => {
                    console.log('[ConfirmActionComponent] Success deleting course from the database');
                    this.hide();
                }, (error) => {
                    console.error('[ConfirmActionComponent] Error deleting course from the database', error);
                    this.hide();
                });
        } else {
            ScheduleService.deleteCourse(this.state.item._id)
                .then(() => {
                    console.log('[ScheduleComponent] Success removing course from the schedule');
                    this.hide();
                }, (error) => {
                    console.error('[ScheduleComponent] Error removing course from the schedule', error);
                    this.hide();
                });
        }
    }

    show(item,courseProvider) {
        if (courseProvider == undefined) {
            console.log('[ConfirmActionComponent] courseProvider is undefined');
            this.setState({visible: true, item: item});
        } else {
            console.log('[ConfirmActionComponent] courseProvider is defined');
            this.setState({visible: true, item: item, courseProvider:courseProvider});
        }
    };

    hide() {
        this.setState({visible: false, item: null, courseProvider: null});
        window.location.reload();
    };

    render() {
        const actions = [];
        actions.push({ secondary: true, children: 'Cancel', onClick: this.hide });
        actions.push(<Button flat primary onClick={this.onClick}>Confirm</Button>);
        
        return( 
            <DialogContainer
                id="simple-action-dialog"
                visible={this.state.visible}
                onHide={this.hide}
                actions={actions}
                title="Are you sure you want to delete this course">
                <p>Are you sure you want to remove this course?</p>
            </DialogContainer>
          
          );
    }
}