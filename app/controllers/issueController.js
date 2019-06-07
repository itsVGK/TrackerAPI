const response = require('./../libs/responseLib');
const check = require('./../libs/checkLib');
const validate = require('./../libs/paramValidationLib');
const mongoose = require('mongoose');
const shortid = require('shortid');
const timeLib = require('./../libs/timeLib')
const pwdLib = require('./../libs/passwordLib')

const UserModel = mongoose.model('User');
const IssueModel = mongoose.model('Issue');
const WatchModel = mongoose.model('Watch');

let loginFunction = (req, res) => {
    let findUser = () => {
        console.log('gng to finsd the user')
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ 'email': req.body.email })
                    .exec((err, userDetails) => {
                        if (err) {
                            reject(response.generate(true, 'unable to retrieve the user details', 400, null))
                        } else if (check.isEmpty(userDetails)) {
                            reject(response.generate(true, 'unable to retrieve the user Details', 400, null));
                        } else {
                            resolve(userDetails);
                        }
                    })
            } else {
                reject(response.generate(true, 'email parameter missing', 400, null));
            }
        })
    }

    let validatePassword = (userDetails) => {
        return new Promise((resolve, reject) => {
            pwdLib.comparePwd(req.body.password, userDetails.password, (err, isMatch) => {
                if (err) {
                    reject(true, 'Login Failed', 400, null);
                } else if (isMatch) {
                    let userObj = userDetails.toObject();
                    delete userObj.password;
                    resolve(userObj);
                } else {
                    reject(true, 'Invalid Password', 400, null)
                }
            })
        })
    }

    findUser(req, res)
        .then(validatePassword)
        .then((resolve) => {
            res.send(response.generate(false, 'Logged in Successfully', 200, resolve))
        })
        .catch((err) => {
            res.send(response.generate(true, 'Unable to login', 400, null));
        })
} // end of Login Function

let signupFunction = (req, res) => {

    let checkAndValidateInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validate.Email(req.body.email)) {
                    reject(response.generate(true, 'Provide the correct email address', 400, null));
                } else if (check.isEmpty(req.body.password)) {
                    reject(response.generate(true, 'Password Parameter Missing', 400, null));
                } else {
                    resolve(req);
                }
            } else {
                reject(response.generate(true, 'One or More Fields Missing', 400, null))
            }
        })
    } // end validation

    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrivedUser) => {
                    if (err) {
                        reject(response.generate(true, 'Unable to create the user', 400, null));
                    } else if (check.isEmpty(retrivedUser)) {
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: pwdLib.hashPwd(req.body.password),
                            createdOn: timeLib.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                reject(response.generate(true, 'unable to create the user', 400, null))
                            } else {
                                let user = newUser.toObject();
                                resolve(user);
                            }
                        })
                    } else {
                        reject(response.generate(true, 'User Already Exists', 400, null))
                    }
                })
        })
    }  // end create user

    checkAndValidateInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            res.send(response.generate(false, 'User Successfully created', 200, resolve));
        })
        .catch((err) => {
            res.send(err);
        })

} // end sign up function

let createIssueFunction = (req, res) => {
    let issueId = shortid.generate();
    // let comments=req.body.comments;
    let issue = new IssueModel({
        issueId: issueId,
        title: req.body.title,
        status: req.body.status,
        assignee: req.body.assignee,
        description: req.body.description,
        reporteeId: req.body.reporteeId,
        createdOn: timeLib.now(),
        modifiedOn: timeLib.now()
    })
    // issue.comments = (comments == undefined || comments == null || comments == '' ? [] : comments.split(','))

    issue.save((err, issueRes) => {
        if (err) {
            res.send(response.generate(true, 'Failed to create an issue', 400, null));
        } else if (check.isEmpty(issueRes)) {
            res.send(response.generate(true, 'Unable to create an issue', 404, null));
        } else {
            res.send(response.generate(false, 'Issue Created Successfully', 200, issueRes));
        }
    })

}  //end of create function

let getAllIssuesByReportee = (req, res) => {
    IssueModel.find({ 'reporteeId': req.params.userId }, (err, issueRes) => {
        if (err) {
            res.send(response.generate(true, 'Failed to retrieve the issue Details', 400, null))
        } else if (check.isEmpty(issueRes)) {
            res.send(response.generate(true, 'Unable to retrieve the issue', 400, null))
        } else {
            res.send(response.generate(false, 'Issue Details were retrieved', 200, issueRes));
        }
    })
} //end of getAllIssuesByUser function

let getAllIssuesByAssignee = (req, res) => {
    IssueModel.find({ 'assignee': req.params.assignee }, (err, issueRes) => {
        console.log(req.params.assignee, issueRes)
        if (err) {
            res.send(response.generate(true, 'Failed to retrieve the issue Details', 400, null))
        } else if (check.isEmpty(issueRes)) {
            res.send(response.generate(true, 'Unable to retrieve the issue', 400, null))
        } else {
            res.send(response.generate(false, 'Issue Details were retrieved', 200, issueRes));
        }
    })
} // get all issues by Assignee

let getAllIssuesByIssueId = (req, res) => {
    IssueModel.find({ 'issueId': req.params.issueId }, (err, issueRes) => {
        if (err) {
            res.send(response.generate(true, 'Failed to retrieve the issue Details', 400, null))
        } else if (check.isEmpty(issueRes)) {
            res.send(response.generate(true, 'Unable to retrieve the issue', 400, null))
        } else {
            res.send(response.generate(false, 'Issue Details were retrieved', 200, issueRes));
        }
    })
}  //end getAllIssuesByIssueId function

let getUsersListFunction = (req, res) => {
    UserModel.find()
        .select('-__v-_id')
        .lean()
        .exec((err, userRes) => {
            if (err) {
                res.send(response.generate(true, 'Failed to retrieve the user Details', 400, null))
            } else if (check.isEmpty(userRes)) {
                res.send(response.generate(true, 'Users List is Empty', 400, null))
            } else {
                for (user in userRes) {
                    delete userRes[user].password
                }
                res.send(response.generate(false, 'User Details were retrieved', 200, userRes));
            }
        })
}// end of getUsers Function

let getUserByUserId = (req, res) => {
    UserModel.find({ 'userId': req.params.userId })
        .exec((err, userRes) => {
            if (err) {
                res.send(response.generate(true, 'Failed to retrieve the user Details', 400, null))
            } else if (check.isEmpty(userRes)) {
                res.send(response.generate(true, 'Unable to retrieve the user', 400, null))
            } else {
                for (user in userRes) {
                    delete userRes[user].password
                }
                res.send(response.generate(false, 'User Details were retrieved', 200, userRes));
            }
        })
}// end of getUserByUserId Function


let getIssueListFunction = (req, res) => {
    IssueModel.find()
        .select('-_v-_id')
        .lean()
        .exec((err, issueRes) => {
            if (err) {
                res.send(response.generate(true, 'Failed to retrieve the issue Details', 400, null))
            } else if (check.isEmpty(issueRes)) {
                res.send(response.generate(true, 'Issue List is Empty', 400, null))
            } else {
                res.send(response.generate(false, 'Issue Details were retrieved', 200, issueRes));
            }
        })
}//end get issues function

let updateIssuebyIssueId = (req, res) => {
    req.body.modifiedOn = timeLib.now();
    IssueModel.updateMany({ 'issueId': req.params.issueId }, req.body, { multi: true })
        .exec((err, updateRes) => {
            if (err) {
                res.send(response.generate(true, 'Failed to update an issue', 400, null));
            } else if (check.isEmpty(updateRes)) {
                res.send(response.generate(true, 'Unable to update an issue', 404, null));
            } else {
                res.send(response.generate(false, 'Issue Updated Successfully', 200, updateRes));
            }
        })
}  //end of update Issue

let addUserToIssueWatchList = (req, res) => {

    WatchModel.findOne({ 'issueId': req.body.issueId })
        .exec((err, result) => {
            if (err) {
                res.send(response.generate(true, 'Unable to retrieve watch list', 400, null))
            } else if (check.isEmpty(result)) {
                let watchList = new WatchModel({
                    'issueId': req.body.issueId,
                    'usersId': req.body.userId,
                    'count': 1
                })
                watchList.save((err, isSaved) => {
                    if (err) {
                        res.send(response.generate(true, 'Unable to save watch list', 400, null))
                    } else {
                        res.send(response.generate(false, 'Watcher Details Updated', 200, isSaved))
                    }
                })
            } else {
                let over = false;
                let usersList = result.usersId.toObject();
                for (let user in usersList) {
                    if (usersList[user] === req.body.userId) {
                        res.send(response.generate(true, 'User Already subscribed to the issue', 401, null))
                        over = true;
                    }
                }
                if (!over) {
                    result.count += 1;
                    result.usersId.push(req.body.userId);
                    result.save((err, resAgain) => {
                        if (err) {
                            res.send(response.generate(true, 'unable to update the view count', 400, null))
                        } else {
                            res.send(response.generate(true, 'Watch status updated', 200, resAgain));
                        }
                    })
                }
            }
        })
}//end addUserToIssueWatchList

let getWatcherforIssue = (req, res) => {
    WatchModel.findOne({ 'issueId': req.params.issueId })
        .exec((err, watcherList) => {
            if (err) {
                res.send(response.generate(true, 'unable to retreieve the watcher list', 400, null))
            } else if (check.isEmpty(watcherList)) {
                res.send(response.generate(true, 'No Watchers Available for the Issue', 400, null))
            } else {
                res.send(response.generate(false, 'Watcher details were retrieved successfully', 200, watcherList));
                ;
            }
        })
}

let getNotificationforUser = (req, res) => {
    WatchModel.find({ 'userId': req.params.userId })
        .exec((err, result) => {
            if (err) {
                res.send(response.generate(true, 'unable to retrieve the user', 400, null))
            } else if (check.isEmpty()) {
                res.send(response.generate(true, 'user not asubscribed to any watch list', 400, null))
            } else {
                res.send(response.generate(false, 'notifications retrieved', 200, result))
            }
        })
}

let updateNotificationforIssue = (req, res) => {
    WatchModel.findOne({ 'issueId': req.params.issueId })
        .exec((error, result) => {
            if (error) {
                res.send(response.generate(true, 'Issue not Availalbe', 400, null))
            } else if (check.isEmpty) {
                res.send(response.generate(true, 'Issue not available', 400, null))
            } else {
                result.isNoteAvl = 1;
                result.save((err, isSaved) => {
                    if (err) {
                        res.send(response.generate(true, 'unable to save update the notifiaction', 400, null))
                    } else {
                        res.send(response.generate(false, 'Notification list updated', 200, isSaved))
                    }
                })
            }
        })
}

module.exports = {
    loginFunction: loginFunction,
    signupFunction: signupFunction,
    createIssueFunction: createIssueFunction,
    getAllIssuesByReportee: getAllIssuesByReportee,
    getAllIssuesByAssignee: getAllIssuesByAssignee,
    getUsersListFunction: getUsersListFunction,
    getUserByUserId: getUserByUserId,
    getAllIssuesByIssueId: getAllIssuesByIssueId,
    getIssueListFunction: getIssueListFunction,
    updateIssuebyIssueId: updateIssuebyIssueId,
    addUserToIssueWatchList: addUserToIssueWatchList,
    getWatcherforIssue: getWatcherforIssue,
    updateNotificationforIssue: updateNotificationforIssue,
    getNotificationforUser: getNotificationforUser
}    