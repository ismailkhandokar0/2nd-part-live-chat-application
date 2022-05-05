// ai file ta mainly protct korbe inbox page, users page k. moloto je sob page a enter korte hole login must lagbe, sei sob page er jonno ai page ta mendatorY

const jwt = require('jsonwebtoken')

const checkLogin = (req,res,next) =>{
    let cookies = 
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null    //req.signedCookies object akare thake. ai object a potiata proparty hoy akta cookie er nam

    if(cookies){
        try{
            token = cookies[process.env.COOKIE_NAME]; 
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decoded              // api response er jonno ata proyojon. ata json response provide kore

            //pass user info to response locals
            if(res.locals.html){
                res.locals.loggedInUser = decoded
            }
            next()

        }catch(err){
            if(res.locals.html){
                res.redirect('/')
            }else{
                res.status(500).json({
                    errors:{
                        common:{
                            msg:'Authentication Failed'
                        }
                    }
                })
            }
        }
    }else{
        if(res.locals.html){
            res.redirect('/');
        }else{
            res.status(401).json({
                error:'Authentication Failed'
            })
        }
    }



}


const redirectLoggedIn = function(req,res,next){
    let cookies = 
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null; 

    if(!cookies){
        next()
    }else{
        res.redirect('/inbox')
    }
}







module.exports = {
    checkLogin,
    redirectLoggedIn
}