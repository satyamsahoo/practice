'use strict'

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let issueSchema = new Schema({
    issueId:{
        type: String,
        default: '',
        index: true,
        unique: true
    },
    title:{
        type: String,
        default :''
    },
    description :{
        type: String,
        default :''
    },
    attachment :{
        type : [],
        default:''
    },
    reporterId :{
        type: String,
        default:''
    },
    assigneeId:{
        type : String,
        default:''
    },
    reportedOn :{
        type: Date,
        default:''
    },
    status:{
        type: String,
        default:''
    },
    Comments:{
        type:[],
        default:''
    },
    Watchers:{
        type: [],
        default:''
    }
})

mongoose.model('Issue',issueSchema);