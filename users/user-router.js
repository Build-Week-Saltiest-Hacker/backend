const router = require('express').Router();
const User = require('../users/user-model');
const Auth = require('../auth/authenticate-middleware');

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
    console.log(req.params.username);
    User.findByUsername(username)
        .then(response => {
            console.log("findbyUsername response: ", response);
            req.body.map(comment => {
                newObject = {
                    ...comment,
                    user_id: response.id
                }
                console.log("object ", newObject);
                User.saveComments(newObject)
                    .then(response => {
                        console.log("That", response);
                        res.status(202).json(response);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json(error);
                    })
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
   
})

router.get('/username=:username/comments', (req, res) => {
    const username = req.params.username;
    User.findByUsername(username)
        .then(response => {
            id = response.id;
            console.log(id);
            User.getComments(id)
                .then(response => {
                    res.status(200).json(response);
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
})

router.put('/username=:username', (req, res) => {
    const username = req.params.username;
    User.findBy({username: username})
        .then(([user]) => {
            console.log(user);
            if(user && bcrypt.compareSync(password, user.password)){
                const token = Auth.generateToken(user);
                res.status(200).json({ message: `${user.username} password successfully changed`, token });
            }else{
                res.status(401).json({ message: 'invalid username and/or password' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: error.message });
        })
})

module.exports = router;