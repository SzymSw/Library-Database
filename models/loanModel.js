const mongoose = require('mongoose');

const loanSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Enter user's ID!"]
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: [true, "Enter book's ID!"]
        },
        borrowDate: {
            type: Date,
            default: Date.now,
        },
        returnDate: {
            type: Date,
            required: [true, "Enter the due date!"]
        },
        returned: {
            type: Boolean,
            default: false
        }
    }
)

const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;
