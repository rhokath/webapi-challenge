const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const productsRouter = require('../products/products-router');
const actionsRouter = require('../actions/actions-router');
const server = express()

//global middleware
server.use(express.json())
server.use(helmet());
server.use(cors())
server.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin")
    next()
})

server.use('/products', productsRouter);
server.use('/actions', actionsRouter);

//route handler sanity check
server.get('/', (req, res)=> {
    res.status(200).json({api: 'working in sprint challenge'})
})

module.exports = server;