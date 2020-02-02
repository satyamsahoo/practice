const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const password = require('../libs/generatePasswordLibs');
const token = require('./../libs/tokenLib')

const UserModel = mongoose.model('User');
const issueModel = mongoose.model('Issue');

let getAllAssignedIssues=(req,res)=>{
    console.log(req.body);
    if(req.body.userId){
        issueModel.findOne({assigneeId: req.body.userId}).exec((err, issueDetails)=>{
            if(err){
                console.log(err)
                logger.error('Failed To Retrieve User Issues', 'dashboardController: getAllAssignedIssues()', 10)
                let apiResponse = response.generate(true, 'Failed To Find User assigned issues', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(issueDetails)){
                logger.info('No issue is assigned to this user','dashboardController:getAllAssignedIssues',5)
                let apiResponse = response.generate(false, 'No issue is assigned to this user', 200, null)
                res.send(apiResponse)
            } else {
                let apiResponse  = response.generate(false,'All issues of user fetched',200,issueDetails);
                res.send(apiResponse)
            }
        })
    }
}





let getIssue=(req,res)=>{
    console.log(req.params.issueId);
    issueModel.findOne({issueId:req.params.issueId}).exec((err,issue)=>{
        if(err){
            console.log(err)
            logger.error('Failed To Retrieve Issues', 'dashboardController: getIssues()', 10)
            let apiResponse = response.generate(true, 'Failed To fetch issue', 403, null)
            res.send(apiResponse)
        } else if(check.isEmpty(issue)){
            logger.error('No issue found with this issueId', 'dashboardController: getIssues()', 10)
            let apiResponse = response.generate(true, 'No issue found with this issueId', 403, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false,'Getting issues of given issueId',200,issue);
            res.send(apiResponse)
            console.log(apiResponse)
        }
    })
}



let createNewIssue=(req,res)=>{
    console.log(req.body);
    let validateUserInput=()=>{
        console.log('ValidateUserInput');
        return new Promise((resolve, reject)=>{
            if(!req.body.reporterId){
                let apiResponse  = response.generate(true,'Required field missing',500,null);
                reject(apiResponse)
            } else if(!req.body.title){
                let apiResponse  = response.generate(true,'Required field missing',500,null);
                reject(apiResponse)

            } else if(!req.body.description){
                let apiResponse  = response.generate(true,'Required field missing',500,null);
                reject(apiResponse)
                
            } else if(!req.body.assigneeId){
                let apiResponse  = response.generate(true,'Required field missing',500,null);
                reject(apiResponse)
                
            }else if(!req.body.status){
                let apiResponse  = response.generate(true,'Required field missing',500,null);
                reject(apiResponse)
                
            } else{
                resolve(req)
            }
        })
    }

 
    let createIssue=()=>{
        console.log('createIssue');
        return new Promise((resolve, reject)=>{
            if(req.body.reporterId){
                UserModel.findOne({userId:req.body.reporterId}).exec((err, userDetail)=>{
                    if(err){
                        logger.error(err.message, 'CreateIssue', 5)
                        let apiResponse = response.generate(true,'Error while checking assignee.',500,null);
                        console.log('1')
                        reject(apiResponse);
                    } else if(check.isEmpty(userDetail)){
                        logger.error('No user with reporterid found', 'CreateIssue', 5)
                        let apiResponse = response.generate(true,'No user with reporterid found',404,null);
                        reject(apiResponse);
                    } else{
                        console.log('1');
                        let newIssue = new issueModel({
                            issueId : shortid.generate(),
                            title : req.body.title,
                            description : req.body.description,
                            attachment : req.body.attachment,
                            reporterId : req.body.reporterId,
                            assigneeId : req.body.assigneeId,
                            reportedOn : time.now(),
                            status : req.body.status,
                            Watchers : [req.body.reporterId, req.body.assigneeId]
                        })
                        
                        newIssue.save((err, newIssue)=>{
                            if(err){
                                logger.error(err.message,'CreateIssue',5);
                                let apiResponse = response.generate(true,'Error while creating issue.',500,null);
                                reject(apiResponse);
                            } else{
                                let newIssueObj = newIssue.toObject();
                                resolve(newIssueObj)
                            }
                        })
                    }
                })  
            } else{
                console.log('No reporterId present')
            }
        })
    }


    validateUserInput(req,res)
        .then(createIssue)
        .then((resolve)=>{
            let apiResponse = response.generate(false,'Issue created',200,resolve);
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
}

module.exports={
    getAllAssignedIssues : getAllAssignedIssues,
    createNewIssue : createNewIssue,
    getIssue : getIssue
}