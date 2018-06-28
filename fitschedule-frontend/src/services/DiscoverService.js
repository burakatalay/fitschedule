"use strict";

import HttpService from "./HttpService";

export default class DiscoverService {

    constructor() {
    }

    static baseURL() {
        return "http://localhost:3000";
    }

    static getCourses(coursename, lat, long, dist) {
        console.log('[DiscoverService] Getting courses with name:',
            coursename, 'lat:', lat, 'long:', long, 'distance:', dist);
        return new Promise((resolve, reject) => {
            HttpService.get(`${DiscoverService.baseURL()}/courses/?course=${coursename}&lat=${lat}&lng=${long}&dist=${dist}`, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getCourseProvider(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${DiscoverService.baseURL()}/courseprovider/${id}`, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}