const fs=require('fs');
const validator=require('validator');
const uniqid=require('uniqid');
const chalk=require('chalk');


const Adduser=(firstName,lastName,passportId,country,email)=>{
const bankers=loadUsers();
const bankerExist=bankers.find(b=>b.PassportId===passportId)
const EmailExist=bankers.find(b=>b.Email===email)
    if(EmailExist || bankerExist){
        console.log(chalk.red.inverse('These Banker PassportId And Email Already Exist'))
        // return 'These Banker PassportId And Email Already Exist'
    }
    else{
        if(validator.isEmail(email) ){
            if (validator.isNumeric(passportId) && passportId.length > 2) {
                const newBanker = {
                    id: uniqid(),
                    FirstName: firstName,
                    LastName: lastName,
                    PassportId: passportId,
                    Country: country,
                    Email: email,
                    Cash: 0,
                    Credit: 0
                }
                bankers.push(newBanker)
                saveUser(bankers)
                console.log(chalk.greenBright.inverse('New BankUser Has Been Added'))
                return ({'New BankUser Has Been Added':newBanker})
            }else{
                console.log(chalk.red.inverse('PassportId must be only numbers and more than two characters'))
                // return 'PassportId must be only numbers and more than two characters'
            }
        }else{
            console.log(chalk.red.inverse('Enter A Valid Email Please '))
            // return 'Enter A Valid Email Please '
        }
    }
}

// const Depositing=(cash)=>{
//
//
// }
const loadUsers=()=>{
    try{
        const dataBuffer=fs.readFileSync('BankUsers.json')
        const dataJson=dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch(err){
        return []
    }
}
const saveUser=(data)=>{
    const dataJSON=JSON.stringify(data)
 fs.writeFileSync('BankUsers.json',dataJSON)
}

module.exports = {
    Adduser,
    loadUsers,saveUser
}