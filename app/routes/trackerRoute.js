const express = require('express');
const router = express.Router();

const appConfig = require('./../../config/appConfig');
const issueController = require('./../controllers/issueController');

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/issue`;

    app.post(`${baseUrl}/login`, issueController.loginFunction);
    console.log(`${baseUrl}/login`);
    app.post(`${baseUrl}/signup`, issueController.signupFunction);
}