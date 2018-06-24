"use strict";

import React from 'react';
import { Component } from "react";
import MDSpinner from "react-md-spinner";

import Home from '../components/Home';

import MovieService from '../services/MovieService';

export class HomeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: false
        });

        MovieService.getMovies().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    onSubmit() {
        this.props.history.push(`/discover`);
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="md-grid md-cell--middle md-cell--center">
                  <MDSpinner className="md-cell--center md-cell--middle" size="50"/>
                </div>
              );
        }

        return (
            <Home onSubmit={() => this.onSubmit()}/>
        );
    }
}
