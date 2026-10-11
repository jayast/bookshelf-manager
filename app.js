const express = require('express');
const methodOverride = require('method-override');
const connectDB = require('./db');
const Book = require('./models/bookModel');

const app = express();
const PORT = 5000;

// Connect Database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// GET: Display all books (and edit form if editing)
app.get('/', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        let editBook = null;
        if (req.query.edit) {
            editBook = await Book.findById(req.query.edit);
        }
        res.render('index', { books, editBook });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST: Add new book
app.post('/books', async (req, res) => {
    try {
        const { title, author } = req.body;
        if (title && author) {
            await Book.create({ title, author });
        }
        res.redirect('/');
    } catch (err) {
        res.status(400).send('Error creating book');
    }
});

// PUT: Update an existing book
app.put('/books/:id', async (req, res) => {
    try {
        const { title, author } = req.body;
        await Book.findByIdAndUpdate(req.params.id, { title, author });
        res.redirect('/');
    } catch (err) {
        res.status(400).send('Error updating book');
    }
});

// DELETE: Delete a book
app.delete('/books/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error deleting book');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});