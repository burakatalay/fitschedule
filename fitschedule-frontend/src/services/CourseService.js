"use strict";

import HttpService from './HttpService';

export default class CourseService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/courses" }

    static getCourse(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    static getCourse(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${CourseService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving course');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteCourse(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${CourseService.baseURL()}/${id}`, function(data) {
                if(data.message != undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateCourse(course) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${course._id}`, course, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

    static createCourse(course) {
        course.id = Math.floor((Math.random() * 100000000) + 1).toString();
        course.posters = {
            thumbnail: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/course/11/27/63/11276344_ori.jpg",
            profile: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/course/11/27/63/11276344_ori.jpg",
            detailed: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/course/11/27/63/11276344_ori.jpg",
            original: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/course/11/27/63/11276344_ori.jpg"
        };
        return new Promise((resolve, reject) => {
            HttpService.post(CourseService.baseURL(), course, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}