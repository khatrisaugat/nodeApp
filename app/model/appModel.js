var sql = require('./db.js');
//Users object constructor
var Users = function (user) {
    let hasPass;
    if (user.name) {
        this.name = user.name;
    }
    if (user.email) {
        this.email = user.email;
    }
    if (user.password) {
        this.password = user.password
    }

};

//insert user
Users.createUser = function (newUser, result) {
    var keys = [], values = [];

    for (var key in newUser) {
        keys.push(key);
        values.push(newUser[key]);
    }
    //timstamp for creation of user
    keys.push("created_at");
    values.push(new Date().toISOString().slice(0, 19).replace('T', ' '));

    keys = keys.join(", ");
    values = values.join("','");
    sql.query("INSERT INTO users(" + keys + ") VALUES('" + values + "')", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            result(null, rows.insertId);
        }
    })
}
//get User by id
Users.getUser = (userId, result) => {
    sql.query("SELECT * FROM users WHERE id=?", userId, (err, res) => {
        if (err) {
            console.log("error: " + err)
        } else {
            result(null, res);
        }
    })
}

//get all users
Users.getAllUsers = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: " + err);
        } else {
            result(null, res);
        }
    })
}

//update user information
Users.updateUser = (userId, user, result) => {
    var addQuery = [];
    for (var key in user) {
        addQuery.push(key + "='" + user[key] + "'");
    }
    //timstamp for update of user info
    addQuery.push("updated_at" + "='" + new Date().toISOString().slice(0, 19).replace('T', ' ') + "'")

    addQuery = addQuery.join(", ");
    sql.query("UPDATE users SET " + addQuery + " WHERE id=?", [userId], (err, res) => {
        if (err) {
            console.log("error: " + err);
        } else {
            result(null, res);
        }
    });
}

//remove user by id
Users.removeUser = (userId, result) => {
    sql.query("DELETE FROM users WHERE id=?", [userId], (err, res) => {
        if (err) {
            console.log("error: " + err);
        } else {
            result(null, res);
        }
    })
}

//LOGIN a user
Users.loginUser = (user, result) => {
    var addQuery = [];
    for (var key in user) {
        if (key != "password")
            addQuery.push(key + "='" + user[key] + "'");
    }

    sql.query("SELECT * FROM users WHERE " + addQuery, (err, res) => {
        if (err) {
            console.log("error: " + err);
        } else {
            result(null, res);
        }
    })
}

module.exports = Users;