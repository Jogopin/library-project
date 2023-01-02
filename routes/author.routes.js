const Book = require("../models/Book.model");
const Author = require("../models/Author.model")

const router =require("express").Router();

router.get("/authors",(req,res,next)=>{
    Book.find()
        .then(authorsArr =>{
            
            res.render("authors/authors-list",{authorsArr})
        })
        .catch(err => {
            console.log(`erroor getting authors from DB ---> ${err}`)
            next()
        })
})



module.exports = router