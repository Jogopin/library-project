const Book = require("../models/Book.model");
const Author = require("../models/Author.model")

const router =require("express").Router();




//READ: List all books
router.get("/books",(req,res,next)=>{
    Book.find().populate("author")
        .then(booksFromDB =>{
            
            res.render("books/books-list",{booksFromDB})
        })
        .catch(err => {
            console.log(`erroor getting books from DB ---> ${err}`)
            next()
        })
})

//READ:Create book
router.get("/books/create",(req,res,next)=>{
    res.render("books/book-create")
})
// 
router.post("/books/create",(req,res,next)=>{

    const { title, author, description, rating } = req.body;

    Book.create({ title, author, description, rating })
        .then(bookDetails=>{
            res.redirect("/books")
        })
        .catch(err=>{
            console.log("error creating new book in DB",err)
            next()
        })

    
})
//READ: Book details
router.get("/books/:bookId",(req,res,next)=>{
    const bookId =req.params.bookId
    Book.findById(bookId)
        .populate("author") // uses the object id from author and replace it with the corresponding object in the DB.
        .then(bookDetails=>{
            res.render("books/book-details",bookDetails)
            
            
        })
        .catch(err=>{
            console.log(`error with the Id`,err)
            next()
        })
    })
//READ:  
router.get("/books/:bookId/edit",(req,res,next)=>{
        Book.findById(req.params.bookId)
            .then((bookDetails)=>{
                res.render("books/book-edit",bookDetails)
            })
            .catch((err)=>{
                console.log("somethiing went wrong..",err)
                next()
            })
    })
// 
router.post("/books/:bookId/edit",(req,res,next)=>{

        const { title, author, description, rating } = req.body

        Book.findByIdAndUpdate(req.params.bookId,{ title, author, description, rating } )
            .then((bookDetails)=>{
                res.redirect(`/books/${bookDetails.id}`)
            })
            .catch((err)=>{
                console.log("we couldnt update anything...",err)
                next()
            })
    })
//delete
router.post("/books/:bookId/delete",(req,res,next)=>{

        

        Book.findByIdAndDelete(req.params.bookId)
            .then((bookDetails)=>{
                res.redirect(`/books`)
            })
            .catch((err)=>{
                console.log("we couldnt delete anything...",err)
                next()
            })
    })


module.exports = router