'use strict'

const mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
const timeLib=require('./../libs/timeLib');

let issueSchema=new Schema({
    issueId:{
        type: String,
        default: '',
        index: true,
        unique: true
    },
    title:{
        type: String,
        default: '',
    },
    status:{
        type: String,
        default: 'backlog',
    },
    assignee:{
        type: String,
        default: '',
    },
    description:{
        type: String,
        default: '',
    },
    reporteeId:{
        type: String,
        default: '',
    },
    comments:{
        type: Array
    },
    createdOn:{
        type: String,
        default: timeLib.now(),
    },
    modifiedOn:{
        type: String,
        default: timeLib.now(),
    }
})

mongoose.model('Issue', issueSchema);