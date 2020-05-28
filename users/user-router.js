const router = require('express').Router();
const User = require('../users/user-model');

//returns all users
router.get('/', (req, res) => {
    const { username } = req.body;
    User.find()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
})

router.get('/userID=:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(response => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
})

router.get('/username=:username', (req, res) => {
    const username = req.params.username;
    console.log(username)
    User.findByUsername(username)
        .then(response => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
})

router.delete('/username=:username', (req, res) => {
    const username = req.params.username;
    User.deleteUser(username)
        .then(response => {
            console.log(response);
            res.status(202).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
})

router.post('/username=:username/save', (req, res) => {
    const username = req.params.username;
    User.saveComments(username, req.body)
        .then(response => {
            console.log(response);
            res.status(202).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
})

router.put('/username=:username', (req, res) => {
    const username = req.params.username;
    
})

module.exports = router;