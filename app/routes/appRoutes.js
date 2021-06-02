module.exports = function (app) {
    // var todoList = require('../controllers/todoListController');
    var UserAuth = require('../controller/appController');

    // Mvc Routes
    app.route('/users')
        .get(UserAuth.list_all_users)
        .post(UserAuth.create_a_User);

    app.route('/users/:id')
        .get(UserAuth.read_a_User)
        .put(UserAuth.update_a_User)
        .delete(UserAuth.delete_a_User);

    app.route('/users/login')
        .post(UserAuth.login_a_user);
};
