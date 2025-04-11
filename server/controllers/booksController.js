const User = require('../models/User')
const Book = require('../models/Book')
const asyncHandler = require('express-async-handler')

// @desc Get all users
// @route GET /users
// @access Private
const getAllBooks = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    //lean remove unecessary data
    const books = await Book.find().lean()

    // If no users 
    if (!books?.length) {
        return res.status(400).json({ message: 'No books found' })
    }

    const booksWithUser = await Promise.all(books.map(async (book) => {
        const user = await User.findById(book.user).lean().exec()
        return { ...book, username: book.username }
    }))

    res.json(booksWithUser)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewBook = asyncHandler(async (req, res) => {
    const { user, title, price, condition} = req.body

    // Confirm data
    if (!user || !title || !price || !condition) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    let sold = "no"

    // Create and store new user 
    const book = await Book.create({user, title, price, condition, sold})

    if (book) { //created 
        res.status(201).json({ message: `New book created` })
    } else {
        res.status(400).json({ message: 'Invalid book data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateBook = asyncHandler(async (req, res) => {
    const { id, user, title, price, condition, category, sold } = req.body

    // Confirm data 
    if (!user || !title || !price || !condition|| !sold) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the user exist to update?
    const book = await Book.findById(id).exec()

    if (!book) {
        return res.status(400).json({ message: 'User not found' })
    }

    book.user = user
    book.title = title
    book.category = category
    book.sold = sold
    book.condition = condition
    book.price = price

    const updatedBook = await book.save()

    res.json({ message: `${updatedBook.title} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteBook = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Book ID Required' })
    }

    // Does the user exist to delete?
    const book = await Book.findById(id).exec()

    if (!book) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await book.deleteOne()

    const reply = `Book ${result.title} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllBooks,
    createNewBook,
    updateBook,
    deleteBook
}