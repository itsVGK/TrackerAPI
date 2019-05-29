const express=require('express');

let appConfig={};

appConfig.port=3000;
appConfig.allowedcorsOrigin="*";
appConfig.env="dev";
appConfig.db={
    uri:'mongodb://127.0.0.1:27017/trackerDB'
}
appConfig.apiVersion='/api/v1';

module.exports= {
    port:appConfig.port,
    allowedcorsOrigin:appConfig.allowedcorsOrigin,
    env: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}