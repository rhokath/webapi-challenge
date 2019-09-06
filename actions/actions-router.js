const express = require('express')
const Actions = require('../data/helpers/actionModel');
const Products = require('../data/helpers/projectModel');

const router = express.Router()

router.get('/', (req, res)=>{
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err =>{
        console.log("error in get actions", err)
        res.status(500).json({
            errorMessage: "The actions info could not be retrieved"
        })
    })
})
router.get('/:id', (req, res) => {
    const {id}= req.params;
    Actions.get(id)
    .then(action => {
        if(action){
        res.status(200).json(action)
        } else {
            res.status(400).json({message: "the action with that id does not exists"})
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
    // Actions.remove(req.params.id)
    // .then(count =>{
    //     if(count && count > 0){
    //         res.status(200).json({message: "the action was successfully deleted"})
    //     } else {
    //         res.status(404).json({errorMessage: "the action with the specified ID does not exists"})

    //     }
    // })
    // .catch(err =>{
    //     console.log("error in delete action", err)
    //     res.status(500).json({errorMessage: "there was a problem deleting the action"})
    // })
    
});
router.put('/', (req, res) => {
    
});

module.exports = router;