'use strict'

const queries = {
    USER: {
        findById: 'SELECT * from User where id = (?)',
        getAll: 'SELECT * from User',
        save: 'UPDATE User SET email = $email, firstName = $firstName, lastName = $lastName, passwordHash = $passwordHash WHERE id = $id',
        add: 'INSERT into User(email, firstName, lastName, passwordHash) values($email, $firstName, $lastName, $passwordHash)',
        delete: 'DELETE from User where id = (?)'
    }
}

module.exports = queries
