const response = require('./../libs/responseLib');
const check = require('./../libs/checkLib');
const validate = require('./../libs/paramValidationLib');
const mongoose = require('mongoose');
const shortid = require('shortid');
const timeLib = require('./../libs/timeLib')

const UserModel = mongoose.model('User');

let loginFunction = (req, res) => {

}

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
                            password: req.body.password,
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
        .catch((err)=>{
            res.send(err);
        })

} // end sign up function

module.exports = {
    loginFunction: loginFunction,
    signupFunction: signupFunction
}   