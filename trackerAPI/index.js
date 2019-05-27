const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const fs=require('fs');

const appConfig=require('./config/appConfig');
const app=express();
const helmet=require('helmet');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(cookieParser);
app.use(helmet());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
  });