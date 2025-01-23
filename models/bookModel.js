const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Enter a book title!"]
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            required: [true, "Enter author's name!"]
        },
        genre: {
            type: String,
            required: [true, "Enter type of genre!"]
        },
        pages: {
            type: Number,
            required: [true, "Enter number of pages!"]
        },
        quantityAvailable: {
            type: Number,
            default: 1
        }
    }
)

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;