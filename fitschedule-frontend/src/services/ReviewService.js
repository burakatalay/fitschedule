"use strict";

import HttpService from "./HttpService";

export default class ReviewsService {

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

    static updateReview(reviewId) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${ScheduleService.baseURL()}`, {
                review: reviewId,
                comment: writtenComment,
                rating: givenRating
            } ,function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}