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
router.post('/:id', validatePostingAction, (req, res) => {
    const post = req.body

    Actions.insert(post)
        .then(post => {
           res.status(201).json(post);
        })
        .catch(()=> {
            res.status(500).json({
                errorMessage: "can't make that post happen"
            })
        })
    
});
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Actions.remove(id)
    .then(action => {
        if(action){
            res.status(200).json({
                message: "the action was deleted."
            })
        } else {
            res.status(404).json({
                message: "the action with the specified ID doesn't exist."
            })
        }
    })
    .catch((err)=> {
        console.log("error in delete of action***", err)
        res.status(500).json({
            errorMessage: "The action could not be removed."
        })
    })
    
    
});
router.put('/:id', (req, res) => {
    const { description, notes} = req.body;
    if(!description || ! notes){
        res.status(400).json({
            errorMessage: 'please provide name and bio for the user.'
        });
    } else {
        Actions.update(req.params.id, req.body)
        .then(action => {
            if (action){
                res.status(200).json(action);
            } else {
                res.status(404).json({
                    message: 'the action with the specified ID does not exist.'
                });
            }
        })
        .catch(()=> {
            res.status(500).json({
                errorMessage: 'The action information could not be modified.'
            })
        })
    }
    
});

//validate actiongit a
function validatePostingAction(req, res, next){
    const { id : project_id} = req.params;
    const { description, notes} = req.body;
    if(!req.body){
        return res.status(400).json({message: "missing data"})
    }
    if(!description || !notes){
        return res.status(400).json({message: "please fill in all fields"})
    }
    if(description.length > 128){
        return res.status(400).json({message: "description can only be 128 characters long"})
    }
    req.body = {project_id, description, notes}
    next()

}
//validate action
function validateAction(req, res, next){
    const {id} = req.params;
    Products.getProjectActions(id)
    .then(actions =>{
        if(actions){
            res.status(200).json(actions)
            next()
        } else {
            res.status(400).json({message: "the actions for that project don't exist"})
        }
    })
    .catch((err)=>{
        console.log("error in validateAction", err)
        res.status(500).json({errorMessage: "there was a problem validating actions"})
    })
}

module.exports = router;