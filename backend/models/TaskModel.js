import { model, Schema } from 'mongoose';

const TaskSchema = new Schema({
    taskName: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
        required: true,
    },
    taskPriority: {
        type: String,
        required: true,
    },
    taskStatus: {
        type: String,
        required: true,
    },
    taskTimeLine: [{
        userName: {
            type: String
        },
        userMsg: {
            type: String
        },
        date: {
            type: Date,
        },
        _id: false,
    }],
    subTask: [{
        subTaskName: {
            type: String,
        },
        subTaskRole: {
            type: String
        },
        date: {
            type: Date,
        },
        _id: false,

    }],
    taskMembers: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'UserDetails'
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        role: {
            type: String
        },
    }],
    date: {
        type: Date,
        default: Date(),
        // db.taskmodels.update({_id:ObjectId('66fee02c58743fffb9292eef')},{$push:{taskTimeLine:{userName: 'Gopi',userMsg: 'Hi this is praveen',date:Date()}}})
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'UserDetails'
    }


});

const tasks = model('taskModel', TaskSchema);

export default tasks