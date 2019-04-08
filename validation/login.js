const Validator =require('validator');
const isEmpty =require('./is-empty');

module.exports = function validateLoginInput(data){
 let error= {};
    data.email= !isEmpty(data.email) ? data.email : '';
    data.password= !isEmpty(data.password) ? data.password : '';
    
    if(Validator.isEmpty(data.email)){
        error.email = " please fill email ";
    }
    if(Validator.isEmpty(data.password)){
        error.password = " please fill password";
    }

    if(!Validator.isEmail(data.email)){
        error.email= "Email field is invalid";
    }

    if(!Validator.isLength(data.password , {min :6 , max: 30})){
        error.password= " Password must be atleast 6 characters";
    }

    return {
        error,
        isValid : isEmpty(error)
    }
};