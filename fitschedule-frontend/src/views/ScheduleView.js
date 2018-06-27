"use strict";

import React from 'react';
import Schedule from '../components/Schedule';
import '../css/schedule.css';

export class ScheduleView extends React.Component {
    
    constructor(props) {
        super(props);
        this.state ={};
        
    }
    //TODO: Check for correct methods
    componentWillMount(){
        /*
        if(this.props.history.location.pathname == '/add') {
            this.setState({
                loading: false,
                movie: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state != undefined && this.props.location.state.movie != undefined) {
            this.setState({
                loading: false,
                movie: this.props.location.state.movie,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;

            MovieService.getMovie(id).then((data) => {
                this.setState({
                    movie: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
        */
    }
    //TODO: check again for correct input here
    updateSchedule(course) {
        /*
        if(this.state.course == undefined) {
            MovieService.createMovie(movie).then((data) => {
                this.props.history.push('/');
            }).catch((e) => {
                console.error(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating movie'}));
            });
        } else {
            MovieService.updateMovie(movie).then((data) => {
                this.props.history.goBack();
            }).catch((e) => {
                console.error(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating movie'}));
            });
        }
        */
    }

    render() {
        return (
            <Schedule schedule={this.state.schedule} onSubmit={() => this.onSubmit()}/>
        );
    }

}