"use strict";

import React from 'react';

import CourseForm from './../components/CourseForm';

import CourseService from '../services/CourseService';


export class CourseFormView extends React.Component {

    constructor(props) {
        super(props);
    }
    
    componentWillMount(){
        if(this.props.history.location.pathname == '/courses') {
            this.setState({
                loading: false,
                course: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state != undefined && this.props.location.state.course != undefined) {
            this.setState({
                loading: false,
                course: this.props.location.state.course,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });
               
            let id = this.props.match.params.id;

            MovieService.getCourse(id).then((data) => {
                this.setState({
                    course: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
    }
    
    updateCourse(course) {
        if(this.state.course == undefined) {
            CourseService.createCourse(course).then((data) => {
                this.props.history.push('/');
            }).catch((e) => {
                console.error(e);
                this.setState({error: 'Error while creating course'});
            });
        } else {
            CourseService.updateCourse(course).then((data) => {
                this.props.history.goBack();
            }).catch((e) => {
                console.error(e);
                this.setState({error: 'Error while creating course'});
            });
        }
    }

    render() {
        return (<CourseForm course={this.state.course} onSubmit={(course) => this.updateCourse(course)} error={this.state.error} />);
    }
}
