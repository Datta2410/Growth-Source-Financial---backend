const mongoose = require('mongoose')

const loanAppSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {type:String, required:true},
    middleName: {type:String, required:true},
    lastName: {type:String, required:true},
    dob: {type:Date, required:true},
    mobileNum: {type:Number, required:true},
    email: {type:String, required:true},
    //address
    address: {type:String, required:true},
    city: {type:String, required:true},
    state: {type:String, required:true},
    zipCode: {type:Number, required:true},
    //id
    officialId: {type:String, required:true},
    idNum: {type:String, required:true},
    // about applicant work
    placeWork: {type:String, required:true},
    jobTitle: {type:String, required:true},
    monthlyIncome: {type:Number, required:true},
    // bank details of applicant
    bankName: {type:String, required:true},
    bankBranchName: {type:String, required:true},
    accountNumber: {type:String, required:true},
    accountType: {type:String, required:true},
    // loan info
    loanPurpose: {type:String, required:true},
    loanAmount: {type:Number, required:true},
    
})

module.exports = mongoose.model('LoanApplication', loanAppSchema)