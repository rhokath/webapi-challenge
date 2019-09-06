const express = require('express');
const Actions = require('../data/helpers/actionModel');
const Products = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res)=>{
    Products.get()
    .then(products => {
        res.status(200).json(products)
    })
    .catch(err =>{
        console.log("error in get products", err)
        res.status(500).json({
            errorMessage: "The products info could not be retrieved"
        })
    })
})
router.get('/:id', (req, res) => {
    const {id}= req.params;
    Products.get(id)
    .then(product => {
        if(product){
        res.status(200).json(product)
        } else {
            res.status(400).json({message: "the product with that id does not exists"})
        }
    })
    .catch(err =>{
        console.log("error in get actions", err)
        res.status(500).json({
            errorMessage: "The actions info could not be retrieved"
        })
    })
    
    
});
router.post('/', (req, res) => {
    const {name, description} = req.body;
    if(!name || ! description){
       res.status(400).json({errorMessage: "please provide name and description for the product"}) 
    } else{
        Products.insert(req.body)
            .then(product =>{
                res.send(201).json(product)
            })   
            .catch(err =>{
                console.log("error in post of product", err)
                res.status(500).json({errorMessage: "there was a problem adding the product to the database"})
            })
    }
    
});
router.delete('/:id', (req, res) => {
    Products.remove(req.params.id)
    .then(count =>{
        if(count && count > 0){
            res.status(200).json({message: "the product was successfully deleted"})
        } else {
            res.status(404).json({errorMessage: "the product with the specified ID does not exists"})

        }
    })
    .catch(err =>{
        console.log("error in delete product", err)
        res.status(500).json({errorMessage: "there was a problem deleting the project"})
    })
    
});
router.put('/:id', (req, res) => {
    const { name, description} = req.body;
    if(!name || ! description){
        res.status(400).json({
            errorMessage: 'please provide name and description for the product.'
        });
    } else {
        Products.update(req.params.id, req.body)
        .then(product => {
            if (product){
                res.status(200).json(req.body);
            } else {
                res.status(404).json({
                    message: 'the product with the specified ID does not exist.'
                });
            }
        })
        .catch(()=> {
            res.status(500).json({
                errorMessage: 'The product information could not be modified.'
            })
        })
    }
    
});


module.exports = router;