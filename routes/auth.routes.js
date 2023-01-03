const bcryptjs =require("bcryptjs")

const User = require("../models/User.model")

const router = require("express").Router()

const saltRounds = 10
//SIGNUP: display form
router.get("/signup",(req,res,next)=>{
    res.render("auth/signup")
})


//SIGNUP: process form
router.post("/signup",(req,res,next)=>{
    const{email,password} = req.body
    
    bcryptjs
        .genSalt(saltRounds)
        .then(salt=>{
            return bcryptjs.hash(password,salt)
        })
        .then((hash)=>{
            const userDetails = {
                email,
                passwordHash: hash
            }
            return User.create(userDetails)
        })
        .then(userFromDB=>{
            res.redirect("/")
        })
        .catch(e => {
            console.log("error creating user account",e)
            next(e);
        })



})


//Login: display form
router.get("/login",(req,res,next)=> res.render("auth/login"))

//Login: process form
router.post("/login",(req,res,next)=>{

    const {email,password} =req.body

    if(!email || !password){
        res.render(`auth/login`,{errorMessage:`please enter both, email and password to login.`})
        return
    }

    //Task:make query to DB to get details of the user
    User.findOne({email})
        .then(userFromDB=>{
            if(!userFromDB){
                res.render("auth/login",{errorMessage:`Email is not registered.`})
                return
            }else if(bcryptjs.compareSync(password,userFromDB.passwordHash)){
                //login succesful
                console.log(`login succesful!!!!!`)
                res.render("users/user-profile",{user: userFromDB})
            }else{
                //login failed
                res.render(`auth/login`,{errorMessage:`Incorrect credentials.`})
            } 

        })
        .catch(error=>{
            console.log(`Error getting user details from DB`,error)
            next(error);
        })
})
router.get("/user-profile",(req,res,next)=>{
    res.render("users/user-profile")
})

module.exports=router