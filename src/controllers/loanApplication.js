const mongoose = require('mongoose')
const LoanApplication = require('../models/loanApplication')
//mail
const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'ydg2418@gmail.com',
        pass:'Datta123@'
    }
})
//sheets
const { GoogleSpreadsheet } = require('google-spreadsheet');
  exports.create_loanApp = async (req, res, next) => {
    try{
        console.log(req.body)
        const newApp = new LoanApplication({
            _id:mongoose.Types.ObjectId(),
            firstName:req.body.firstName,
            middleName:req.body.middleName,
            lastName:req.body.lastName,
            dob:req.body.dob,
            mobileNum:req.body.mobileNum,
            email:req.body.email,
            address:req.body.address,
            city:req.body.city,
            state:req.body.state,
            zipCode:req.body.zipCode,
            officialId:req.body.officialId,
            idNum:req.body.idNum,
            placeWork:req.body.placeWork,
            jobTitle:req.body.jobTitle,
            monthlyIncome:req.body.monthlyIncome,
            bankName:req.body.bankName,
            bankBranchName:req.body.bankBranchName,
            accountNumber:req.body.accountNumber,
            accountType:req.body.accountType,
            loanPurpose:req.body.loanPurpose,
            loanAmount:req.body.loanAmount,
        })

        await newApp.save()

        const message = {
            from: 'ydg2418@gmail.com',
            to: 'yayathi2000@gmail.com',
            subject: 'New Loan Application',
            html: '<h1>Loan Application</h1>'
                    +`<p> First Name: ${req.body.firstName}</p>`
                    +`<p> Middle Name: ${req.body.middleName}</p>`
                    +`<p> Last Name: ${req.body.lastName}</p>`
                    +`<p> Date of Birth: ${req.body.dob}</p>`
                    +`<p> Mobile Number: ${req.body.mobileNum}</p>`
                    +`<p> Email: ${req.body.email}</p>`
                    +`<p> Address: ${req.body.address}</p>`
                    +`<p> City: ${req.body.city}</p>`
                    +`<p> State: ${req.body.state}</p>`
                    +`<p> Zip Code: ${req.body.zipCode}</p>`
                    +`<p> Official ID: ${req.body.officialId}</p>`
                    +`<p> ID Number: ${req.body.idNum}</p>`
                    +`<p> Place of Work: ${req.body.placeWork}</p>`
                    +`<p> Job Title: ${req.body.jobTitle}</p>`
                    +`<p> Monthly Income: ${req.body.monthlyIncome}</p>`
                    +`<p> Bank Name: ${req.body.bankName}</p>`
                    +`<p> Branch Name: ${req.body.bankBranchName}</p>`
                    +`<p> Account Number: ${req.body.accountNumber}</p>`
                    +`<p> Account Type: ${req.body.accountType}</p>`
                    +`<p> Purpose of Loan: ${req.body.loanPurpose}</p>`
                    +`<p> Loan Amount Requested: ${req.body.loanAmount}</p>`
        }
        const mail = await transport.sendMail(message)

        const doc = new GoogleSpreadsheet('1c4VmEFDBZEpyGYMhb1Pp5NZJ2oCqS_x0gaF96-UG_XQ');
        await doc.useServiceAccountAuth(require('../../client_secret.json'));
        await doc.loadInfo(); // loads document properties and worksheets
        console.log(doc.title);
        const sheet = doc.sheetsByIndex[0];
        console.log(sheet)
        const NewApp = await sheet.addRow({
            'First Name':req.body.firstName,
            'Middle Name':req.body.middleName,
            'Last Name':req.body.lastName,
            'Date of Birth':req.body.dob,
            'Mobile Number':req.body.mobileNum,
            'Email':req.body.email,
            Address:req.body.address,
            City:req.body.city,
            State:req.body.state,
            'Zip Code':req.body.zipCode,
            'Official ID':req.body.officialId,
            'ID Number':req.body.idNum,
            'Place Of Work':req.body.placeWork,
            'Job Title':req.body.jobTitle,
            'Monthly Income':req.body.monthlyIncome,
            'Bank Name':req.body.bankName,
            'Branch Name':req.body.bankBranchName,
            'Account Number':req.body.accountNumber,
            'Account Type':req.body.accountType,
            'Purpose of Loan':req.body.loanPurpose,
            'Loan Amount':req.body.loanAmount,
        }); 
        res.status(201).json(mail)
    }
    catch(e){
        console.log(e)
        res.status(500).json(e) 
    }
}
