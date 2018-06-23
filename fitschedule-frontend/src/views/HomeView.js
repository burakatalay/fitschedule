"use strict";

import React from 'react';

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
            loading: true
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

    onSubmit(input) {
        // this.setState({
        //     data: [...this.state.data],
        //     loading: true
        // });
        // MovieService.deleteMovie(id).then((message) => {
        //
        //     let movieIndex = this.state.data.map(movie => movie['_id']).indexOf(id);
        //     let movies = this.state.data;
        //     movies.splice(movieIndex, 1);
        //     this.setState({
        //        data: [...movies],
        //        loading: false
        //     });
        // }).catch((e) => {
        //     console.error(e);
        // });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <Home onSubmit={(input) => this.onSubmit(input)}/>
        );
    }
}
