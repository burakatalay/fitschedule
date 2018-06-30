"use strict";

import React from 'react';
import {Button, Card, CardActions, CardText, Checkbox, TextField} from 'react-md';
import {withRouter} from 'react-router-dom';

import {AlertMessage} from './AlertMessage';
import Page from './Page';


const style = {maxWidth: 500, marginTop: '2rem', marginBottom:'2rem'};


class UserSignup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            surname: '',
            email: '',
            password: '',
            isCourseProvider: false
        };

        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleIsCourseProvider = this.handleIsCourseProvider.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeFirstname(value) {
        this.setState({firstname: value});
    }

    handleChangeSurname(value) {
        this.setState({surname: value});
    }

    handleChangeEmail(value) {
        this.setState({email: value});
    }

    handleChangePassword(value) {
        this.setState({password: value});
    }

    handleIsCourseProvider(value) {
        this.setState({isCourseProvider: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            firstname: this.state.firstname,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            isCourseProvider: this.state.isCourseProvider,
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <form onSubmit={this.handleSubmit}
                          onReset={() => this.props.history.goBack()}>
                        <CardText>
                            <TextField
                                label="Firstname"
                                id="firstnameField"
                                type="text"
                                className="md-row"
                                required={true}
                                value={this.state.firstname}
                                onChange={this.handleChangeFirstname}
                                errorText="Firstname is required"/>
                            <TextField
                                label="Surname"
                                id="surnameField"
                                type="text"
                                className="md-row"
                                required={true}
                                value={this.state.surname}
                                onChange={this.handleChangeSurname}
                                errorText="Surname is required"/>
                            <TextField
                                label="E-Mail"
                                id="emailField"
                                type="text"
                                className="md-row"
                                required={true}
                                value={this.state.email}
                                onChange={this.handleChangeEmail}
                                errorText="E-Mail is required"/>
                            <TextField
                                label="Password"
                                id="PasswordField"
                                type="password"
                                className="md-row"
                                required={true}
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                                errorText="Password is required"/>
                            <Checkbox
                                id="checkbox-IsCourseProvider"
                                name="simple-checkboxes[]"
                                label="Are you a course provider?"
                                type="checkbox"
                                value={this.state.isCourseProvider}
                                onChange={this.handleIsCourseProvider}/>
                        </CardText>
                        <CardActions>
                            <Button id="submit" type="submit"
                                    disabled={this.state.firstname == undefined || this.state.firstname == '' || this.state.surname == undefined || this.state.surname == '' || this.state.email == undefined || this.state.email == '' || this.state.password == undefined || this.state.password == '' ? true : false}
                                    raised primary className="md-cell md-cell--2">Register</Button>
                            <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                            <AlertMessage
                                className="md-row md-full-width">{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                        </CardActions>
                    </form>
                </Card>
            </Page>
        );
    }
};

export default withRouter(UserSignup);