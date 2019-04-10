var errorSet = new Set([]) ;
var successSet = new Set([]);



var addError = (newErrorValue) =>{
    errorSet.add (newErrorValue);
}

var addSuccess = (newSuccesMessage)=>{
    successSet.add(newSuccesMessage);
}

var clearSuccessMessages = ()=>{
    successSet = new Set() ; 
}

var clearErrorMessages = ()=>{
    errorSet  = new Set() ;
}
/**
 * returns all the error in the array
 */
var getAllErrors=()=>{
    var errors = "" ;
    errorSet.forEach(error=>{
        errors+=error ; 
    });
    return errors ;
}
/**
 * Returns all the successes in the array 
 * 
 */
var getAllSuccesses = ()=>{
    var successes = "";
    successSet.forEach(success=>{
        successes+=success ; 
    }) ;

    return successes ;
}

/**
 * Export all the varibles to the server file and use it 
 */

 var tester = "I am just a testing variable";
 //export all the function to the server 
 module.exports = {getAllErrors,getAllSuccesses,clearErrorMessages,clearSuccessMessages ,addSuccess , addError,tester} ;

