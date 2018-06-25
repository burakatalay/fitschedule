"use strict";

import React from 'react';

import Home from '../components/Home';

export class HomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    onSubmit() {
        this.props.history.push('/discover');
    }

    render() {
        return (
            <Home onSubmit={() => this.onSubmit()}/>
        );
    }
}
