"use strict";

import HttpService from "./HttpService";

export default class UserService {

    constructor() {
    }

    static baseURL() {return "http://localhost:3000/auth"; }

    static register(first, sur, email, pass, prov) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, {
                firstname: first,
                surname: sur,
                email: email,
                password: pass,
                isCourseProvider: prov
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static login(email, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/login`, {
                email: email,
                password: pass,
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static logout(){
        window.localStorage.removeItem('jwtToken');
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id : JSON.parse(window.atob(base64)).id,
            email: JSON.parse(window.atob(base64)).email
        };
    }

    static whoami() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${UserService.baseURL()}/whoami`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static isCourseProvider() {
        return new Promise((resolve, reject) => {
            this.whoami().then((data) => {
                console.log('[UserService] Success getting current user data', data);
                resolve(data.isCourseProvider);
            },(error)=> {
                console.error('[UserService] Error getting current user data');
                reject();
            });
        });
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }

    static getUserFullName(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${UserService.baseURL()}/name/${id}`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}
