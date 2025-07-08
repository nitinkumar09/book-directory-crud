const Book = require('../models/bookModel');

// @desc Get all books
exports.getBooks = async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
};

// @desc Get single book
exports.getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
};

// @desc Create a new book
exports.createBook = async (req, res) => {
    const { title, author, description, publishedYear } = req.body;
    const book = new Book({ title, author, description, publishedYear });
    const createdBook = await book.save();
    res.status(201).json(createdBook);
};

// @desc Update a book
exports.updateBook = async (req, res) => {
    const { title, author, description, publishedYear } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.publishedYear = publishedYear || book.publishedYear;

    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
};

// @desc Delete a book
exports.deleteBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.remove();
    res.status(200).json({ message: 'Book deleted' });
};
