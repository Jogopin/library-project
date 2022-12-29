const Book = require("../models/Book.model");

const router =require("express").Router();
//List all books
router.get("/books",(req,res,next)=>{
    Book.find()
        .then(booksFromDB =>{
            res.render("books/books-list",{booksFromDB})
        })
        .catch(err => {
            console.log(`erroor getting books from DB ---> ${err}`)
            next()
        })
})
//Book details
router.get("/books/:bookId",(req,res,next)=>{
    const bookId =req.params.bookId
    Book.findById(bookId)
        .then(bookDetails=>{
            res.render("books/book-details",bookDetails)
            
            
        })
        .catch(err=>{
            console.log(`error with the Id`,err)
            next()
        })
})



module.exports = router