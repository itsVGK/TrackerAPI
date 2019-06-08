'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: 'passskdajakdjkadsj'
  },
  createdOn: {
    type: Date,
    default: ""
  },
  noteList: {
    type: Array,
    unique: true
  }

})


mongoose.model('User', userSchema);