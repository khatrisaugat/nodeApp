var Users = require('../model/appModel.js');
const bcrypt = require('bcrypt');
exports.list_all_users = function (req, res) {
    Users.getAllUsers(function (err, Users) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', Users);
        res.send(Users);
    });
};



exports.create_a_User = async function (req, res) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    var new_User = new Users(req.body);

    //handles null error 
    if (!new_User.name || !new_User.password) {

        res.status(400).send({ error: true, message: 'Please provide username and password' });

    }
    else {

        Users.createUser(new_User, function (err, User) {

            if (err)
                res.send(err);
            res.json(User);
        });
    }
};


exports.read_a_User = function (req, res) {
    Users.getUser(req.params.id, function (err, User) {
        if (err)
            res.send(err);
        res.json(User);
    });
};


exports.update_a_User = async function (req, res) {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    Users.updateUser(req.params.id, new Users(req.body), function (err, Users) {
        if (err)
            res.send(err);
        res.json(Users);
    });
};


exports.delete_a_User = function (req, res) {


    Users.removeUser(req.params.id, function (err, User) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};

exports.login_a_user = function (req, res) {
    Users.loginUser(req.body, async function (err, User) {
        if (err) {
            res.send(err);
        } else {
            if (await bcrypt.compare(req.body.password, User[0].password))
                res.json(User);
            else
                res.json({ "message": "Username or password incorrect" });
        }
    })
}