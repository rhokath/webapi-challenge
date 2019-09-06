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
    
});
router.delete('/', (req, res) => {
    
});
router.put('/', (req, res) => {
    
});


module.exports = router;