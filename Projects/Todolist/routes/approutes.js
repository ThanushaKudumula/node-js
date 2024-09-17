const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskcontroller');

router.get('/display', taskController.displayTask);
router.get('/new', taskController.newTaskForm);
router.post('/newtodo', taskController.addTask);
router.get('/edit/:id', taskController.editTaskForm);
router.post('/edit/:id', taskController.updateTask);
router.post('/delete/:id', taskController.deleteTask);

module.exports = router;
