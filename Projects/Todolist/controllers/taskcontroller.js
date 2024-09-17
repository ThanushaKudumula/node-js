const Task = require('../models/data');

exports.displayTask = (req, res) => {
    Task.find()
        .then(result => {
            res.render('index', { todo: result });
        })
        .catch(err => console.log(err));
};

exports.newTaskForm = (req, res) => {
    res.render('add', { todo: [] });
};

exports.addTask = (req, res) => {
    const task = new Task({
        task: req.body.todo
    });
    task.save()
        .then(() => res.redirect('/display'))
        .catch(err => console.log(err));
};

exports.editTaskForm = (req, res) => {
    Task.findById(req.params.id)
        .then(result => {
            res.render('edit', { edit: result });
        })
        .catch(err => console.log(err));
};

exports.updateTask = (req, res) => {
    Task.findByIdAndUpdate(req.params.id, { task: req.body.edit })
        .then(() => res.redirect('/display'))
        .catch(err => console.log(err));
};

exports.deleteTask = (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/display'))
        .catch(err => console.log(err));
};
