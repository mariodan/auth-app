'use strict'

const queries = {
    USER: {
        findById: 'SELECT * from User where id = $id',
        getAll: 'SELECT * from User',
        save: 'UPDATE User SET email = $email, firstName = $firstName, lastName = $lastName, passwordHash = $passwordHash, lastLogout = $lastLogout WHERE id = $id',
        add: 'INSERT into User(email, firstName, lastName, passwordHash) values($email, $firstName, $lastName, $passwordHash)',
        delete: 'DELETE from User where id = (?)',
        findByEmail: 'SELECT * from User where email = (?)'
    },
    TEST: {
        USER: {
            createTable: `CREATE TABLE IF NOT EXISTS User
            (
              id                   INTEGER PRIMARY KEY AUTOINCREMENT,
              email                TEXT,
              passwordHash         TEXT,
              firstName            TEXT,
              lastName             TEXT,
              lastLogout           INTEGER
            )`,
            insertRecord: `INSERT into User(email, firstName, lastName, passwordHash) values('test55@mydomain.com', 'test first name', 'test last name', 'pass#1234')`
        }
    }
}

module.exports = queries
