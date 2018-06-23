"use strict";

import React from 'react';

import Discover from '../components/Discover';

export class DiscoverView extends React.Component {

    

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

        // MovieService.getMovies().then((data) => {
        //     this.setState({
        //         data: [...data],
        //         loading: false
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
            <Discover input={this.state.input} />
        );
    }
}