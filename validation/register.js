const Validator =require('validator');
const isEmpty =require('./is-empty');

module.exports = function validateRegisterInput(data){
 let error= {};
    data.name= !isEmpty(data.name) ? data.name : '';
    data.email= !isEmpty(data.email) ? data.email : '';
    data.password= !isEmpty(data.password) ? data.password : '';
    
    if(!Validator.isLength(data.name,{min :2 , max : 30} )){
        error.name =" Name between 2 to 30 chars";
    }

    if(Validator.isEmpty(data.name)){
        error.name= " Name field is required";
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