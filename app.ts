// const express = require('express')
// import * as express from 'express';
import express from 'express'
// import router = require('./routers/todos')
import router from './routers/todos';
import bodyparser from 'body-parser';
const app = express()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/api/todos', router);

export = app;