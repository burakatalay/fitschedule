"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, FontIcon, ListItem, MenuButton} from 'react-md';
import {withRouter} from 'react-router-dom'

import UserService from '../services/UserService';


class KebabMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        }
    }

    logout() {
        console.log(UserService.getCurrentUser());
        UserService.logout();
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        };
        if(this.props.location.pathname != '/') {
            this.props.history.push('/');
        }
        else {
            window.location.reload();
        }
    }

    render() {
        const menuItems = [];
        if(this.state.user) {
            menuItems.push(<ListItem key={1} leftAvatar={<Avatar icon={<FontIcon>account_circle</FontIcon>}/>} primaryText={this.state.user.email}/>);
            menuItems.push(<ListItem key={2} leftAvatar={<Avatar>MS</Avatar>} primaryText="My Schedule" onClick={() => this.props.history.push('/schedule')}/>);
            UserService.isCourseProvider().then((isCourseProvider) => {
                if(isCourseProvider) {
                    menuItems.push(<ListItem key={3} leftAvatar={<Avatar icon={<FontIcon>add</FontIcon>}/>} primaryText="Add Course" onClick={() => this.props.history.push('/add')}/>);
                }
                menuItems.push(<ListItem key={menuItems.length+1} primaryText="Logout" onClick={() => this.logout()}/>)
            });
        } else {
            menuItems.push(<ListItem key={1} primaryText="Login" onClick={() => this.props.history.push('/login')}/>);
        }
        return (
            <MenuButton
                id={this.props.id}
                icon
                className={this.props.className}
                menuItems={menuItems}>
                more_vert
            </MenuButton>
        );
    }
}

KebabMenu.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    menuItems: PropTypes.array
};

export default withRouter(KebabMenu);