"use strict";

import HttpService from "./HttpService";

//TODO: implement this later when backend is ready for to work.
export default class ScheduleService {

    constructor() {
    }

    static baseURL() {
        return "http://localhost:3000/schedule";
    }

    static getUserSchedule() {
        
    }

    static addToSchedule(courseId) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${ScheduleService.baseURL()}/${courseId}`, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}