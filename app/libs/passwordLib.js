"use strict"
const bcrypt=require('bcrypt');
const saltRounds=10;

let hashPwd=(plainPwd)=>{
    let salt=bcrypt.genSaltSync(saltRounds);
    let hash=bcrypt.hashSync(plainPwd, salt);
    return hash;
}

let comparePwd=(oldPwd, hashPwd, cb)=>{
    bcrypt.compare(oldPwd, hashPwd, (err, result)=>{
        if(err){
            cb(err, null);
        }else{
            cb(null, result);
        }
    })
}

module.exports={
    hashPwd:hashPwd,
    comparePwd:comparePwd
}