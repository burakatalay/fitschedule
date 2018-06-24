"use strict";

import React from 'react';

import Discover from '../components/Discover';
import DiscoverService from "../services/DiscoverService";

export class DiscoverView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    discover(query) {
        DiscoverService.getCourseProviders(query.course, query.coord.lat, query.coord.lng, query.dist)
            .then((data) => {
                console.error('[DiscoverView] Success getting course providers', data);
            }).catch((e) => {
            console.error('[DiscoverView] Error getting course providers', e);
        });
    }

    render() {
        return (
            <Discover onSubmit={(query) => this.discover(query)}/>
        );
    }
}