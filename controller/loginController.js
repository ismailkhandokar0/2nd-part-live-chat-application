//external imports 
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')

//internal imports 
const User = require('../models/People')


//get login page 
function getLogin(req,res,next){
    res.render('index')
}


//do login
async function login(req,res,next){
    try{
        //find a user who has this email/username
        const user = await User.findOne({
            $or:[{email:req.body.username},{mobile:req.body.username}]
        })

        if(user && user._id){
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if(isValidPassword){
                // prepare the user object to generate token
                const userObject ={
                    username:user.name,
                    mobile:user.mobile,
                    email:user.email,
                    role:'user'
                }

                //generate token
                const token = jwt.sign(userObject,process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_EXPIRY
                })

                //set cookie
                res.cookie(process.env.COOKIE_NAME,token,{
                    maxAge:process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed:true
                })

                //set logged in user local identifire
                res.locals.loggedInUser = userObject            //er mane loggedInUser ami project sob jaigay use korte parbo

                res.render('inbox')


            }else{
                throw createError('Login failed! Please try again.')
            }

        }else{
            throw createError('Login Failed! Please try again.')
        }

    }catch(err){
        res.render('index',{
            data:{                                       // er mane password vul holew page reload nilew usrname remove hove ba notun kore likte hobe na            
                username:req.body.username
            },
            errors:{                                    // eta amader error format
                common:{
                    msg:err.message
                }
            }
        })
    }
}


// do logout
function logout(req,res,next){
    res.clearCookie(process.env.COOKIE_NAME)
    res.send('logged out')
}





module.exports ={
    getLogin,
    login,
    logout
}