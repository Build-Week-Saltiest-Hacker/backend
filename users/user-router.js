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
            res.status(401).json(error);
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
            res.status(401).json(error);
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
            res.status(401).json(error);
        })
})


module.exports = router;