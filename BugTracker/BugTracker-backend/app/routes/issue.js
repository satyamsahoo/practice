const express = require('express');
const router = express.Router();
const dashboardController = require("./../../app/controllers/dashboardController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app)=>{

    let baseUrl = `${appConfig.apiVersion}/dashboard`;

    app.post(`${baseUrl}/create`, dashboardController.createNewIssue);

    app.get(`${baseUrl}/:issueId`, dashboardController.getIssue);

    app.post(`${baseUrl}`, dashboardController.getAllAssignedIssues);

    /**
     * @apiGroup dashboard
     * @apiVersion  1.0.0
     * @api {post} /api/v1/dashboard api for personalized dashboard view.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Issues Fetched Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */
}