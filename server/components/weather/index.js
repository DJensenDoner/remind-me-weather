'use strict';

var express = require('express');
var Agenda = require('agenda');
var sampleJob = require('./weather.controller');
var config = require('../../config/environment');

console.log('from here' , config.mongo.options);

//setting up agenda
var agenda = new Agenda({db: { address: "mongodb://djensen:password01@dogen.mongohq.com:10002/where_is_my_weather"}});

exports.setupJobs = function()
{	

};