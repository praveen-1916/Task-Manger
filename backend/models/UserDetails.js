import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'admin'
    },
    date: {
        type: Date,
        default: Date.now,
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'UserDetails'
    }


});

const User = model('UserDetails', UserSchema);

export default User