const db = require('../data/dbConfig');
module.exports = {
    addUser,
    find,
    findBy,
    findById,
    findByUsername,
    deleteUser,
    saveComments
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
    console.log(id);
    return db('users').where('id', id).first();
}

function findByUsername(username) {
    return db('users').where('username', username).first();
}

function deleteUser(username) {
    return db('users').where('username', username).del();
}

function saveComments(username, comments) {
    console.log(username);
    return db('users').where('username', username).select('saved').insert({saved: JSON.stringify(comments)});
}

function updatePassword(username, password) {
    return db('users').where('username', username).select('password').update(password)
}