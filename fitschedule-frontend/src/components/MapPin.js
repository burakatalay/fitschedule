import React from 'react';
import {FontIcon} from "react-md";
import {withRouter} from "react-router-dom";

const pinStyle = {fontSize: 30};

class MapPin extends React.Component {
    render() {
        return this.props.isPerson ? <FontIcon secondary style={pinStyle}>person_pin</FontIcon>
            : <FontIcon primary style={pinStyle}>place</FontIcon>
    }
}


export default withRouter(MapPin);