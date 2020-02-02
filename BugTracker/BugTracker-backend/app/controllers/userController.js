const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const password = require('../libs/generatePasswordLibs');
const token = require('./../libs/tokenLib')

/* Models */
const UserModel = mongoose.model('User');
const authModel = mongoose.model('Auth');


// start user signup function 

let signUpFunction = (req, res) => {

    let validateUserInput=()=>{
        return new Promise((resolve, reject)=>{
            console.log(req.body);
            if(req.body.email){
                if(!validateInput.Email(req.body.email)){
                    let apiResponse = response.generate(true,'Email is not valid',400,null);
                    reject(apiResponse);
                } else if(check.isEmpty(req.body.password)){
                    let apiResponse = response.generate(true,'Password is empty',400,null);
                    reject(apiResponse);
                } else {
                    resolve(req)
                }
            } else{
                logger.error('email missing', 'Usercontroller: validateUserInput',10);
                let apiResponse = response.generate(true,'Email is empty',400,null);
                reject(apiResponse);
            }
        })
    }

    let createUser=()=>{
        return new Promise((resolve , reject)=>{
            UserModel.findOne({email: req.body.email}).exec((err, retreivedUserDetails)=>{
                if(err){
                    logger.error(err.message, 'CreateUser', 5)
                    let apiResponse = response.generate(true,'Error while creating user.',500,null);
                    reject(apiResponse);
                } else if (check.isEmpty(retreivedUserDetails)){
                    let userId = shortid.generate();
                    let newUser = new UserModel({
                        userId : userId,
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        email : req.body.email,
                        password : password.hashpassword(req.body.password)
                    })
                    newUser.save((err,newUser)=>{
                        if(err){
                            logger.error(err.message,'CreatedUser',5);
                            let apiResponse = response.generate(true,'Error while creating user.',500,null);
                            reject(apiResponse);
                        } else {
                            let newUserObj = newUser.toObject();
                            resolve(newUserObj);
                        }
                    })
                } else{
                    logger.error('Email already in use','CreatedUser',5);
                    let apiResponse = response.generate(true,'Email in use',403,null);
                    reject(apiResponse);
                }
            })
        })
    }

    validateUserInput(req,res)
        .then(createUser)
        .then((resolve)=>{
            delete resolve.password;
            apiResponse = response.generate(false,'User created',200,resolve);
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
  

}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {

    let findUser =()=>{
        return new Promise((resolve, reject)=>{
            if(req.body.email){
                UserModel.findOne({email: req.body.email}).exec((err,userDetails)=>{
                    if(err){
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(userDetails)){
                        logger.error('No user found','controller: findUser',10);
                        let apiResponse = response.generate(true,'Failed to find user details',403,null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found','usercontroller:finduser()',10);
                        let apiResponse = response.generate(false,'User found',200,userDetails)
                        resolve(userDetails);
                    }
                })
            } else{
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            } 
        })
    }

    let validatePassword=(retreivedUserDetails)=>{
        console.log('Validate Password')
        return new Promise((resolve, reject)=>{
            password.comparePassword(req.body.password,retreivedUserDetails.password,(err, isMatch)=>{
                if(err){
                    console.log(err);
                    logger.error(err.message, 'userController: validatePassword()',10);
                    let apiResponse = response.generate(true, 'Error while loging',500, null);
                    reject(apiResponse);
                } else if (isMatch){
                    let retreivedUserDetailsObj = retreivedUserDetails.toObject();
                    delete retreivedUserDetailsObj._id;
                    delete retreivedUserDetailsObj.__v;
                    delete retreivedUserDetailsObj.password;
                    resolve(retreivedUserDetailsObj);
                } else {
                    logger.info('Login Failed due to invalid password','userController:validpassword()',10);
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }
    
    let generateToken=(userDetails)=>{
        console.log('Generating token');
        return new Promise((resolve, reject)=>{
            token.generateToken(userDetails, (err, tokenDetails)=>{
                if(err){
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else{
                    tokenDetails.userId = userDetails.userId,
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveToken=(tokenDetails)=>{
        console.log('Saving Token');
        return new Promise((resolve, reject)=>{
            authModel.findOne({userId:tokenDetails.userId}).exec((err, retreivedTokenDetails)=>{
                if(err){
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(retreivedTokenDetails)){
                    let newAuthToken = authModel({
                        userId : tokenDetails.userId,
                        tokenSecret : tokenDetails.tokenSecret,
                        authToken : tokenDetails.token
                    });
                    newAuthToken.save((err,newTokenDetail)=>{
                        if(err){
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else{
                            let responseBody = {
                                authToken: newTokenDetail.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrivedTokenDetails.authToken = tokenDetails.token
                    retrivedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrivedTokenDetails.tokenGenerationTime = time.now();
                    retrivedTokenDetails.save((err,newTokenDetails)=>{
                        if(err){
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else{
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })

        })
    }

    findUser(req,res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}


// end of the login function 

let getAllUsers=(req, res)=>{
    UserModel.find().select('-__v -_id -password')
        .lean().exec((err, result)=>{
            if(err){
                console.log(err)
                logger.error(err.message, 'UserController : getAllUser', 10);
                let apiResponse = response.generate(true, 'Failed to find User Details', 500, null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)) {
                logger.info('No users found','UserController : getAllUser',10);
                let apiResponse = response.generate(false,'No User detail found',404,null )
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false,'User detail found',200,result);
                res.send(apiResponse);
                console.log('User detail found')
            }
        })
}


let logout = (req, res) => {

    authModel.findOneAndRemove({userId:req.params.userId}).exec((err,result)=>{
        if(err){
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)){
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
    })
  
} // end of the logout function.


module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout,
    getAllUsers : getAllUsers

}// end exports