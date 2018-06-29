"use strict";

import HttpService from "./HttpService";

export default class ReviewService {

    constructor() {
    }

    static baseURL() {
        return "http://localhost:3000/review/";
    }


    static publishReview(courseId) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${ScheduleService.baseURL()}`, {
                course: courseId,
                comment: writtenComment,
                rating: givenRating
            } ,function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getReview(reviewId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ScheduleService.baseURL()}`, {
                id: reviewId,
            } ,function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}