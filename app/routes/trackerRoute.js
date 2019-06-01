const express = require('express');
const router = express.Router();

const appConfig = require('./../../config/appConfig');
const issueController = require('./../controllers/issueController');

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/issue`;

    app.post(`${baseUrl}/login`, issueController.loginFunction);

    app.post(`${baseUrl}/signup`, issueController.signupFunction);

    app.post(`${baseUrl}/create`, issueController.createIssueFunction);

    app.get(`${baseUrl}/getBy/user/:userId`, issueController.getAllIssuesByUser);

    app.get(`${baseUrl}/users`, issueController.getUsersListFunction)

    app.get(`${baseUrl}/issues`, issueController.getIssueListFunction)

    app.get(`${baseUrl}/getBy/issue/:issueId`, issueController.getAllIssuesByIssueId);

    app.post(`${baseUrl}/update/:issueId`, issueController.updateIssuebyIssueId);

    app.post(`${baseUrl}/addWatch`, issueController.addUserToIssueWatchList)

}