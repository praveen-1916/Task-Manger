import { Router } from "express";
import { body, validationResult } from "express-validator";
// import User from '../models/UserDetails.js';
import Task from '../models/TaskModel.js';
import fetchUser from "../middleware/fetchUser.js";

const router = Router();


router.post('/createtask', fetchUser, [
    body('taskName', 'Please enter a valid name').isLength({ min: 3 }),
    body('taskDescription', 'Please enter a valid email').isLength({ min: 5 }),
],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.json({ success: false, errors: result.array() });
        } else {
            try {
                const { taskName, taskDescription, taskStatus, taskPriority, taskMembers } = req.body
                const adminId = req.userId;
                const taskDetails = new Task({ taskName, taskDescription, taskStatus, taskPriority, taskMembers, adminId });
                await taskDetails.save();
                res.json({ taskDetails, success: true, msg: 'Task created successfully!' })
            } catch (error) {
                res.status(400).json({ success: false, errorMsg: 'Internal server error!', err: error })
            }

        }
    })


router.delete('/deletetask/:id', fetchUser, async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.userId;
        const task = await Task.findById(taskId);
        if (!task) {
            res.status(400).json({ success: false, errorMsg: 'This task not found in our database' })
        } else {
            if (task.adminId.toString() === userId) {
                await Task.findByIdAndDelete(req.params.id);
                res.json({ success: true, msg: 'Task deleted successfully' })
            } else {
                res.json({ success: false, errorMsg: 'Your not allowed to delete this task' })
            }
        }

    } catch (error) {
        res.status(400).json({ success: false, errorMsg: 'Internal server error!', err: error })
    }
})


router.post('/addcomment/:id', fetchUser, [
    body('userName', 'Please enter a valid name').isLength({ min: 3 }),
    body('userMsg', 'Please enter a valid message').isLength({ min: 3 }),
],
    async (req, res) => {
        try {
            const taskId = req.params.id;
            const userId = req.userId;
            const task = await Task.findById(taskId);
            const { userName, userMsg } = req.body;
            if (!task) {
                res.status(400).json({ success: false, errorMsg: 'This task not found in our database' })
            } else {
                const teamMemberId = task.taskMembers.find((teamMember) => { return teamMember.userId.toString() === userId })?.userId;
                if (task.adminId.toString() === userId || teamMemberId) {
                    await Task.findByIdAndUpdate(taskId, { $push: { taskTimeLine: { userName, userMsg, date: Date() } } })
                    res.json({ success: true, msg: 'Comment added successfully' })
                } else {
                    res.json({ success: false, errorMsg: 'Your not allowed to update this task' })
                }
            }
        } catch (error) {
            res.status(400).json({ success: false, errorMsg: 'Internal server error!', err: error })
        }
    })

router.put('/updateTask/:id', fetchUser,
    async (req, res) => {
        try {
            const taskId = req.params.id;
            const userId = req.userId;
            const task = await Task.findById(taskId);
            if (!task) {
                res.status(400).json({ success: false, errorMsg: 'This task not found in our database' })
            } else {
                const teamMemberId = task.taskMembers.find((teamMember) => { return teamMember.userId.toString() === userId })?.userId;
                if (task.adminId.toString() === userId || teamMemberId) {
                    await Task.findByIdAndUpdate(taskId, { $set: req.body });
                    res.json({ success: true, msg: 'Task updated successfully' })
                } else {
                    res.json({ success: false, errorMsg: 'Your not allowed to update this task' })
                }
            }
        } catch (error) {
            res.status(400).json({ success: false, errorMsg: 'Internal server error!', err: error })
        }
    })


router.get('/getAllTasks', fetchUser,
    async (req, res) => {
        try {
            const userId = req.userId;
            const admin = req.header('admin');
            if (admin === 'true') {
                const allTasks = await Task.find({ adminId: userId });
                res.json({ success: true, allTasks });
            } else {
                const allTasks = await Task.find({ "taskMembers.userId": userId })
                res.json({ success: true, allTasks });
            }
        } catch (error) {
            res.status(400).json({ success: false, errorMsg: 'Internal server error!', err: error })
        }
    })


export default router;