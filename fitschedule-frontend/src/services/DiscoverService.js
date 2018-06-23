"use strict";

import HttpService from "./HttpService";

export default class DiscoverService {

    constructor() {
    }

    static baseURL() {return "http://localhost:3000/auth"; }

    static getResults(){
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
     }


    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
}