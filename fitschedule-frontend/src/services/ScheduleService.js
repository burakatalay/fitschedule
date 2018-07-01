"use strict";

import HttpService from "./HttpService";
import UserService from "./UserService";

//TODO: implement this later when backend is ready for to work.
export default class ScheduleService {
    constructor() {

    }

    static baseURL() {
        return "http://localhost:3000/schedule";
    }

    static courseURL() {
        return "http://localhost:3000/courses";
    }

    static getSchedule() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function(data) {
                console.log('[ScheduleService] Getting Schedule of the User', data)
                resolve(data);
            }, function(textStatus) {
                console.log('[ScheduleService] getSchedule() Error', textStatus)
                reject(textStatus);
            });
        });
    }

    static getCourse(id) {
        console.log('[ScheduleService] Getting courses of the User Schedule')
        return new Promise((resolve, reject) => {
            HttpService.get(`${ScheduleService.courseURL()}/${id}`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    //We may not need this method
    // static createCourse(course) {
    //     return new Promise((resolve, reject) => {
    //         HttpService.post(ScheduleService.baseURL(), course, function(data) {
    //             resolve(data);
    //         }, function(textStatus) {
    //             reject(textStatus);
    //         });
    //     });
    // }

    static deleteCourse(courseId) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${ScheduleService.baseURL()}/${courseId}`, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateCourse(id) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${ScheduleService.baseURL()}/${id}`, movie, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

    static addToSchedule(courseId) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${ScheduleService.baseURL()}`, {
                course: courseId
            } ,function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}