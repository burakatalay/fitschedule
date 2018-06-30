"use strict";

import HttpService from "./HttpService";

export default class ReviewService {

    constructor() {
    }

    static baseURL() {
        return "http://localhost:3000/review";
    }


    static publishReview(courseId, writtenComment) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${ReviewService.baseURL()}`, {
                course: courseId,
                comment: writtenComment
            } ,function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getReview(reviewId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ReviewService.baseURL()}/${reviewId}`, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}