const express = require('express');
const router = express.Router();

const appConfig = require('./../../config/appConfig');
const issueController = require('./../controllers/issueController');

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/issue`;

    app.post(`${baseUrl}/login`, issueController.loginFunction);

    /**
     * @apiGroup Users
     * @apiVersion 0.0.1
     * @api {POST} /api/v1/issues/login LOGIN
     *      
     * @apiParam {String} email Email of the User. (body Params) (required)
     * @apiParam {String} password Password to Login. (body Params) (required)
     * 
     * @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
     *      "error": false,
     *      "message": "Logged in Successfully",
     *       "status": 200,
     *       "data": {
     *           "userId": "dTGZ7N9AF",
     *          "firstName": "gopala",
     *           "lastName": "krishnan",
     *           "email": "vgk2@gmail.com",
     *           "createdOn": "2019-06-01T08:22:23.000Z",
     *           "_id": "5cf235bf4545513efcf4923e",
     *           "__v": 0
     *        }
     *  }
     * 
     * @apiErrorExample  {json} Error- Response
     * {
     *       "error":true,
     *       "message":"Unable to Login",
     *       "status":500,
     *        "data":null
     * }
     */

    app.post(`${baseUrl}/signup`, issueController.signupFunction);
    /**
   * @apiGroup Users
   * @apiVersion 0.0.1
   * @api {POST} /api/v1/issues/signup SIGNUP
   *     
   * @apiParam {String} firstName FirstName of the User. (body Params) (required)
   * @apiParam {String} lastName LastName to Login. (body Params) (required)
   * @apiParam {String} email Email of the User. (body Params) (required)
   * @apiParam {String} password Password to Login. (body Params) (required)
   * 
   * @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
   * 
   * @apiSuccessExample {json} Success-Response:
   * {
   *      "error": false,
   *      "message": "User created Successfully",
   *       "status": 200,
   *       "data": {
   *           "userId": "dTGZ7N9AF",
   *           "firstName": "gopala",
   *           "lastName": "krishnan",
   *           "email": "vgk2@gmail.com",
   *           "createdOn": "2019-06-01T08:22:23.000Z",
   *           "_id": "5cf235bf4545513efcf4923e",
   *           "__v": 0
   *        }
   *  }
   * 
   * @apiErrorExample  {json} Error- Response
   * {
   *       "error":true,
   *       "message":"User Already Exists",
   *       "status":500,
   *        "data":null
   * }
   */

    app.post(`${baseUrl}/create`, issueController.createIssueFunction);
    /**
  * @apiGroup Issues
  * @apiVersion 0.0.1
  * @api {POST} /api/v1/issues/create CREATE ISSUE
  *      
  * @apiParam {String} title Title of the Issue. (body Params) (required)
  * @apiParam {String} status Status of the Issue. (body Params) (required)
  * @apiParam {String} assignee Assignee to whom issue assigned. (body Params) (required)
  * @apiParam {String} description Description of the Issue (body Params) (required)
  * @apiParam {String} reporteeId User who reported the issue. (body Params) (required)     * 
  * 
  * @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
  * 
  * @apiSuccessExample {json} Success-Response:
    {
    "error": false,
    "message": "Issue Created Successfully",
    "status": 200,
    "data": {
        "issueId": "DW4w3FUq9",
        "title": "issue title",
        "status": "issue status",
        "assignee": "SyLbLrnoo",
        "description": "issue description",
        "reporteeId": "dTGZ7N9AF",
        "comments": "",
        "createdOn": "2019-06-02T05:01:31.000Z",
        "modifiedOn": "2019-06-02T05:01:31.000Z",
        "_id": "5cf3582be5709015c4a68a3e",
        "__v": 0
        }
    }
  * 
  * @apiErrorExample  {json} Error- Response
  * {
  *       "error":true,
  *       "message":"Unable to create an issue",
  *       "status":500,
  *        "data":null
  * }
  */

    app.get(`${baseUrl}/getBy/user/:userId`, issueController.getAllIssuesByReportee);

    /**
* @apiGroup Issues
* @apiVersion 0.0.1
* @api {GET} /api/v1/issues/getBy/user/:userId Issue by UserId
*      
* @apiParam {String} userId User Id to whom the issue details needs to be retrieved sent as URL Parameter (required)
* 
* @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
* 
* @apiSuccessExample {json} Success-Response:
    {
        "error": false,
        "message": "Issue Details were retrieved",
        "status": 200,
        "data": {
            "issueId": "DW4w3FUq9",
            "title": "issue title",
            "status": "issue status",
            "assignee": "SyLbLrnoo",
            "description": "issue description",
            "reporteeId": "dTGZ7N9AF",
            "comments": "",
            "createdOn": "2019-06-02T05:01:31.000Z",
            "modifiedOn": "2019-06-02T05:01:31.000Z",
            "_id": "5cf3582be5709015c4a68a3e",
            "__v": 0
            }
    }
* 
* @apiErrorExample  {json} Error- Response
* {
*       "error":true,
*       "message":"Unable to retrieve the issue",
*       "status":500,
*        "data":null
* }
*/

    app.get(`${baseUrl}/getBy/assignee/:assignee`, issueController.getAllIssuesByAssignee);

    /**
    * @apiGroup Issues
    * @apiVersion 0.0.1
    * @api {GET} /api/v1/issues/getBy/assignee/:assignee Issue by Assignee
    *      
    * @apiParam {String} assignee User Id to whom the issues were assigned sent as URL Parameter (required)
    * 
    * @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
    * 
    * @apiSuccessExample {json} Success-Response:
    {
        "error": false,
        "message": "Issue Details were retrieved",
        "status": 200,
        "data": {
            "issueId": "DW4w3FUq9",
            "title": "issue title",
            "status": "issue status",
            "assignee": "SyLbLrnoo",
            "description": "issue description",
            "reporteeId": "dTGZ7N9AF",
            "comments": "",
            "createdOn": "2019-06-02T05:01:31.000Z",
            "modifiedOn": "2019-06-02T05:01:31.000Z",
            "_id": "5cf3582be5709015c4a68a3e",
            "__v": 0
            }
    }
    * 
    * @apiErrorExample  {json} Error- Response
    * {
    *       "error":true,
    *       "message":"Unable to retrieve the issue",
    *       "status":500,
    *        "data":null
    * }
    */

    app.get(`${baseUrl}/users`, issueController.getUsersListFunction)

    /**
* @apiGroup Users
* @apiVersion 0.0.1
* @api {GET} /api/v1/issues/users All Users
*      
* @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
* 
* @apiSuccessExample {json} Success-Response:
{
    "error": false,
    "message": "User Details were retrieved",
    "status": 200,
    "data": {
        "_id": "5cf21ffca9143c23f0bf9f00",
        "userId": "CAjxNuRTK",
        "firstName": "gopala",
        "lastName": "krishnan",
        "email": "vgk@gmail.com",
        "createdOn": "2019-06-01T06:49:32.000Z",
        "__v": 0
        }
}
* 
* @apiErrorExample  {json} Error- Response
* {
*       "error":true,
*       "message":"Unable to retrieve the user",
*       "status":500,
*        "data":null
* }
*/

    app.get(`${baseUrl}/users/:userId`, issueController.getUserByUserId)

    /**
* @apiGroup Users
* @apiVersion 0.0.1
* @api {GET} /api/v1/issues/users/:userId Get Specific User
*      
* @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
* 
* @apiSuccessExample {json} Success-Response:
{
    "error": false,
    "message": "User Details were retrieved",
    "status": 200,
    "data": {
        "_id": "5cf21ffca9143c23f0bf9f00",
        "userId": "CAjxNuRTK",
        "firstName": "gopala",
        "lastName": "krishnan",
        "email": "vgk@gmail.com",
        "createdOn": "2019-06-01T06:49:32.000Z",
        "__v": 0
        }
}
* 
* @apiErrorExample  {json} Error- Response
* {
*       "error":true,
*       "message":"Unable to retrieve the user",
*       "status":500,
*        "data":null
* }
*/

    app.get(`${baseUrl}/issues`, issueController.getIssueListFunction)

    /**
* @apiGroup Issues
* @apiVersion 0.0.1
* @api {GET} /api/v1/issues/issues All Issues
*      
* @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
* 
* @apiSuccessExample {json} Success-Response:
{
    "error": false,
    "message": "Issue Details were retrieved",
    "status": 200,
    "data": {
        "issueId": "DW4w3FUq9",
        "title": "issue title",
        "status": "issue status",
        "assignee": "SyLbLrnoo",
        "description": "issue description",
        "reporteeId": "dTGZ7N9AF",
        "comments": "",
        "createdOn": "2019-06-02T05:01:31.000Z",
        "modifiedOn": "2019-06-02T05:01:31.000Z",
        "_id": "5cf3582be5709015c4a68a3e",
        "__v": 0
        }
}
* 
* @apiErrorExample  {json} Error- Response
* {
*       "error":true,
*       "message":"Unable to retrieve the issue",
*       "status":500,
*        "data":null
* }
*/

    app.get(`${baseUrl}/getBy/issue/:issueId`, issueController.getAllIssuesByIssueId);

    /**
* @apiGroup Issues
* @apiVersion 0.0.1
* @api {GET} /api/v1/issues/:issueId Issue by IssueId
*      
* @apiParam {String} issueId Issue Id to which the issue details needs to be retrieved sent as URL Parameter (required)
* 
* @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
* 
* @apiSuccessExample {json} Success-Response:
  {
      "error": false,
      "message": "Issue Details were retrieved",
      "status": 200,
      "data": {
          "issueId": "DW4w3FUq9",
          "title": "issue title",
          "status": "issue status",
          "assignee": "SyLbLrnoo",
          "description": "issue description",
          "reporteeId": "dTGZ7N9AF",
          "comments": "",
          "createdOn": "2019-06-02T05:01:31.000Z",
          "modifiedOn": "2019-06-02T05:01:31.000Z",
          "_id": "5cf3582be5709015c4a68a3e",
          "__v": 0
          }
  }
* 
* @apiErrorExample  {json} Error- Response
* {
*       "error":true,
*       "message":"Unable to retrieve the issue",
*       "status":500,
*        "data":null
* }
*/

    app.post(`${baseUrl}/update/:issueId`, issueController.updateIssuebyIssueId);

    /**
* @apiGroup Issues
* @apiVersion 0.0.1
* @api {POST} /api/v1/issues/update/:issueId Update Issue
*      
* @apiParam {String} issueId Issue Id to which the issue details needs to be updated sent as URL Parameter (required)
* 
* @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
* 
* @apiSuccessExample {json} Success-Response:
    {
    "error": false,
    "message": "Issue Updated Successfully",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
        }
    }
* 
* @apiErrorExample  {json} Error- Response
* {
*       "error":true,
*       "message":"Unable to Update the issue",
*       "status":500,
*        "data":null
* }
*/

    app.post(`${baseUrl}/addWatch`, issueController.addUserToIssueWatchList)

    app.get(`${baseUrl}/getWatcher/:issueId`, issueController.getWatcherforIssue);

    app.post(`${baseUrl}/updateNote/:issueId`, issueController.updateNotificationforIssue);

    app.get(`${baseUrl}/getNote/:userId`, issueController.getNotificationforUser)

}