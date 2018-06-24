"use strict";

import HttpService from "./HttpService";

export default class DiscoverService {

    constructor() {
    }

    static baseURL() {return "http://localhost:3000/courses"; }

    static getCourseProviders(course, lat, long, dist){
        return new Promise((resolve, reject) => {
            HttpService.get(`${DiscoverService.baseURL()}/?course=${course}&lat=${lat}&long=${long}&dist=${dist}`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
     }
}