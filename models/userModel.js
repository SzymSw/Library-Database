const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Enter user's first name!"]
        },
        lastName: {
            type: String,
            required: [true, "Enter user's last name!"]
        },
        email: {
            type: String,
            required: [true, "Enter user's e-mail address!"]
        },
        password: {
            type: String,
            required: [true, "Enter a password!"]
        },
        role: {
            type: String,
            enum: ['admin', 'librarian', 'customer'],
            required: [true, "Enter user's role!"]
        }
    }
)

const User = mongoose.model('User', userSchema);
module.exports = User;