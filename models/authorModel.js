const mongoose = require('mongoose');

const authorSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Enter author's first name!"]
        },
        middleName: {
            type: String
        },
        lastName: {
            type: String,
            required: [true, "Enter author's last name!"]
        }
    }
)

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;