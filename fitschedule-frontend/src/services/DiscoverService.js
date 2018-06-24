"use strict";

import HttpService from "./HttpService";

export default class DiscoverService {

    constructor() {
    }

    static baseURL() {
        return "http://localhost:3000/courses";
    }

    static getCourseProviders(course, lat, long, dist) {
        console.log('[DiscoverService] Getting course providers for course:',
            course, 'lat:', lat, 'long:', long, 'distance:', dist);
        return new Promise((resolve, reject) => {
            HttpService.get(`${DiscoverService.baseURL()}/?coursename=${course}&lat=${lat}&long=${long}&dist=${dist}`, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}