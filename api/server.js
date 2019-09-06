const express = require('express');
const productsRouter = require('../products/products-router');
const actionsRouter = require('../actions/actions-router');
const server = express()

//global middleware
server.use(express.json())

server.use('/products', productsRouter);
server.use('/actions', actionsRouter);

//route handler sanity check
server.get('/', (req, res)=> {
    res.status(200).json({api: 'working in sprint challenge'})
})

module.exports = server;