const db = require('../data/dbConfig');
module.exports = {
    addUser,
    find,
    findBy,
    findById,
    findByUsername,
    deleteUser,
    saveComments,
    getComments,
    setUserId
};

function addUser(user) {
    return db('users').insert(user)
        .then(show => {
            return findById(show[0])
        });
}

function find(user) {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    return db('users').where(filter);
}

function findById(id) {
    return db('users').where('id', id).first();
}

function findByUsername(username) {
    return db('users').where('username', username).first();
}

function deleteUser(username) {
    return db('users').where('username', username).del();
}

function saveComments(comment) {
    console.log("save comment: ", comment);
    return db('comments').insert(comment)
}

function getComments(id) {
    return db('comments')
        .where('user_id', id)
        .select('*')
}

function updatePassword(username, password) {
    return db('users').where('username', username).select('password').update(password)
}

function setUserId(username) {
    return db('users').select('id').where('username', username)
}