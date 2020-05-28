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
    return db('users').where({id}).first();
}

function findByUsername(username) {
    return db('users').where('username', username).first();
}

function deleteUser(username) {
    return db('users').where('username', username).del();
}

function saveComments(username, comments) {
    return db('users').where('username', username).update({saved: JSON.stringify(comments)});
}