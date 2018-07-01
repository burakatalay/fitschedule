"use strict";

import React from 'react';
import {Button, Card, CardActions, CardText, TextField} from 'react-md';
import {Link, withRouter} from 'react-router-dom';

import {AlertMessage} from './AlertMessage';
import Page from './Page';
import UserService from "../services/UserService";


const style = {maxWidth: 500, marginTop: '2rem', marginBottom: '2rem'};


class UserLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(value) {
        this.setState(Object.assign({}, this.state, {email: value}));
    }

    handleChangePassword(value) {
        this.setState(Object.assign({}, this.state, {password: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        UserService.login(user.email, user.password).then((data) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <form onSubmit={this.handleSubmit}
                          onReset={() => this.props.history.goBack()}>
                        <CardText>
                            <TextField
                                label="E-Mail"
                                id="LoginField"
                                type="text"
                                className="md-row"
                                required={true}
                                value={this.state.email}
                                onChange={this.handleChangeEmail}
                                errorText="Login is required"/>
                            <TextField
                                label="Password"
                                id="PasswordField"
                                type="password"
                                className="md-row"
                                required={true}
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                                errorText="Password is required"/>
                            <Link to={'/register'} className="md-cell">Not registered yet?</Link>
                        </CardText>
                        <CardActions>
                            <Button id="submit" type="submit"
                                    disabled={this.state.email == undefined || this.state.email == '' || this.state.password == undefined || this.state.password == '' ? true : false}
                                    raised primary className="md-cell md-cell--2">Login</Button>
                            <Button id="reset" type="reset" raised secondary
                                    className="md-cell md-cell--2">Dismiss</Button>
                            <AlertMessage
                                className="md-row md-full-width">{this.state.error ? `${this.state.error}` : ''}</AlertMessage>
                        </CardActions>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(UserLogin);