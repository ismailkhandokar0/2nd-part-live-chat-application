//external imports 
const bcrypt = require('bcrypt')
const {unlink} = require('fs')
const path = require('path')

//internal imports 
const User = require('../models/People')




//get user page
async function getUsers(req,res,next){
    try{
        const users = await User.find() 
        res.render('users',{users:users})
    }catch(err){
        next(err)
    }
}


//add user 
async function addUser(req,res,next){
    let newUser;
    const hasedPassword =await bcrypt.hash(req.body.password,10)

    if(req.files && req.files.length>0){
        newUser = new User({
            ...req.body,
            avatar:req.files[0].filename,
            password:hasedPassword
        })
    }else{
        newUser = new User({
            ...req.body,
            password:hasedPassword
        })
    }

    try{
        const result = await newUser.save();
        res.status(200).json({
            message:'User was successfully added'
        })
        console.log(result)
    }catch(err){
        res.status(500).json({
            errors:{
                common:{
                    msg:'Unknown error occured'
                }
            }
        })
    }

}


//remove user 
async function removeUser(req,res,next){
    try{
        const user =await User.findByIdAndDelete({
            _id:req.params.id
        })
    
        if(user.avatar){
            unlink(
                path.join(__dirname,`/../public/uploads/avatars/${user.avatar}`),
                err => console.log(err)
            )
        };
    
        res.status(200).json({
            message:'User was removed successfully'
        })
    }catch(err){
        res.status(500).json({
            errors:{
                common:{
                    msg:'could not delete the user!'
                }
            }
        })
    }
}










module.exports ={
    getUsers,
    addUser,
    removeUser
}