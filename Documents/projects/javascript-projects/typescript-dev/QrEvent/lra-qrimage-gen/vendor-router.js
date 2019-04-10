var express = require('express');

const {
    Pool, Client
} = require('pg'); 


var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var qr = require('qr-image');
var hasher = require('object-hash');
var uuid_generator = require('uuid/v1');
var EventEmitter = require('events');
const excelToJson = require('convert-excel-to-json');
var multer = require('multer');
var archiver = require('archiver');


var months = ["JANUARY","FEBUARY","MATCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"] ;


var allQrImageDirectory = months[new Date().getMonth()]+"-"+new Date().getFullYear();
var masterDirFolder = path.join(__dirname ,"/guest-qrcode-images");


/*
a  midware to extract the files the user has sent to the server 
**/
/**
 * middleware to intercept the request and guest the files and the fields in the body of the request 
 * */
var upload = multer() ; 

var emitter = new EventEmitter();
var errorMessage = "";
var successMessage = "";
emitter.on('error', (error) => {
    errorMessage += error
})
console.log(errorMessage);
emitter.on('success', (success) => {
    successMessage += success
});
console.log(successMessage);
var staticURL = "https://cedarqr-image-gen.appspot.com";




var vendor  = express() ;

folderCheck() ; //check if the folder exist, if it does not exist then it creates a new one 
vendor.get("/generate/qrcode/new/all", (request, response, error) => {

    var creationDate = JSON.parse (request.query.dateCreated ) ;
    console.log(creationDate.date) 

    var imageQrCodeDir = masterDirFolder+"/"+allQrImageDirectory+"/"+creationDate.date; //this is where the new files will be written into 
    console.log("DIRECTORY : ","HELLO HELLO HELLO");
    console.log(imageQrCodeDir)


    var vendors = JSON.parse(request.query.data);
    console.log(vendors.length);

    console.log("VENDORS RECIEVED====>" , vendors)

    /**
     * make the new directory for the image files to be uploaded into 
     * */
    try {
        addNewVendor(vendors ,imageQrCodeDir,response) ;
    }catch (error){
        console.log(error);
    }finally{
        console.log("Request received...");
    }      
});



/*
a  midware to extract the files the user has sent to the server 
**/
/**
 * middleware to intercept the request and guest the files and the fields in the body of the request 
 * */
var upload = multer() ; 

var emitter = new EventEmitter();
var errorMessage = "";
var successMessage = "";
emitter.on('error', (error) => {
    errorMessage += error
})
console.log(errorMessage);
emitter.on('success', (success) => {
    successMessage += success
});
console.log(successMessage);
// var staticURL = "https://cedarqr-image-gen.appspot.com";
var staticURL = "https://cedarqr-image-gen.appspot.com";




/**
 * check if the directory exist and if it doesnt the server creates new folder directory
 * Check if the master directory exists and the all image qrcode exist
 */

//  console.log("ERROR",fs.existsSync(masterDirFolder)

function folderCheck(){
    try {
        if ( fs.existsSync(masterDirFolder, ()=>{}) === true ) {
            if(fs.existsSync(path.join(masterDirFolder , "/"+allQrImageDirectory)) === false ){
                fs.mkdir(path.join(masterDirFolder , "/"+allQrImageDirectory),()=>{});
                console.log(" [ + + + ]DIRECTORY DOES NOT EXIST AND A NEW ONE IS CREATED : ",masterDirFolder,"/"+allQrImageDirectory);
            }
        }else{

            console.log("YES")
            fs.mkdirSync(masterDirFolder , (err)=>{
                if(err.code === "EEXIST"){
                    console.log("ERROR_OCCURED_WHILE_CREATING :",masterDirFolder,err)
                }else{
                    console.log("DIRECTORY_CREATED_SUCCESSFULLY : ", masterDirFolder);
                }
            });


            fs.mkdirSync(path.join(masterDirFolder , "/"+allQrImageDirectory), ()=>{});
            console.log(" [ + + + ]DIRECTORY DOES NOT EXIST AND A NEW ONE IS CREATED : ",masterDirFolder,"/"+allQrImageDirectory);
    
        }
    }catch (error){
        console.log("--------------------------ERROR-----------------------------------");
        console.log(error);
        fs.appendFile("server.app.log","----------------------------------"+new Date().toString()+"-----------------------------------------\n",()=>{})
        fs.appendFile("server.app.log",error,()=>{}) ;
    }
}





/**
 * Deploymemnt configuration to the postgresql in google cloud platform 
 */
// const pool = new Pool();

// const pool = new Pool({
//     user: 'postgres',
//     host: '35.232.105.29',
//     database: 'cedarqrimagegen_db',
//     password: 'postgres',
//     port: 5432,
// });


/**
 * Local pslq connection on my linux machine
 */
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cedarqrcode',
    password: 'postgres',
    port: 5432,
});





vendor.get("/qrcode/authenticate", function(request, response, error) {
    console.log("Request URL =>>>>" , request.url);
    var vendorname = request.query.vendorname;
    var phonenumber = request.query.phonenumber;
    var vendorURL = `${staticURL}/qrcode/authenticate/stage/?vendorname=${vendorname}&phonenumber=${phonenumber}`;
    

        pool.query("SELECT vendorname,phonenumber,checked_in FROM vendors WHERE vendorname=$1 and phonenumber=$2", [vendorname, phonenumber], (error, fields) => {
            var message = "";
            if (error) {
                console.error("Error Occured in the database",error);
                response.send(`<h1
                style= 'margin-top: 2% ;text-align: center ;color:red; border: 5px solid red ; padding: 30px ;'>
                [ Server Error ] - Qr Code Checking/Out was not successful <br/> Contact the system administrator</h1>`)
            } else {
                console.log("RESULTS=====>", fields);
    
                if (typeof fields.rows[0] === 'undefined') {
                    message = `<div 
                    style = 'border : 2px solid red; border-radius : 10px ;
                    -webkit-box-shadow: -4px 4px 38px -9px rgba(0,0,0,0.42);
                    -moz-box-shadow: -4px 4px 38px -9px rgba(0,0,0,0.42);
                    box-shadow: -4px 4px 38px -9px rgba(0,0,0,0.42);
                    z-index: 54;'>
                    <h1 style='color : green; paddind: 10px ;'> Message :=:=: Sorry Vendor <br/> 
                    Vendor Name : ${vendorname} <br/> Phone Number : ${phonenumber} <br/>
                    <strong style='color : red'>IS NOT REGISTERED</strong>
                    </h1>
                  <div>`;
    
                    console.log(fields);
                    condition = !0;
                    response.send(message);
    
                } else {
    
                    message = fields.rows[0].checked_in === !0 ? 
                    /**
                     * Displays a succssful checked out message to the browser
                     */
    
                    `<div style='background-color : white ;text-align:center; 
                    border-radius : 10px ; height:200px; border-top:10px solid yellow; 
                    border:3px solid orange;border-bottom-right-radius:100px;
                    -webkit-box-shadow: -4px 4px 38px -9px rgba(0,0,0,0.42);
                    -moz-box-shadow: -4px 4px 38px -9px rgba(0,0,0,0.42);
                    box-shadow: -4px 4px 38px -9px rgba(0,0,0,0.42);
                    z-index: 54;
                    border-bottom-left-radius:100px'> 
    
                            <div>
                                <h5>Firstname: ${fields['rows'][0].vendorname} <br/> Phone Number: ${fields['rows'][0].phonenumber} </h5>
                            </div>
                            <h1 style='color : green; text-align: center'> Message :- Vendor <strong>CHECKED OUT</strong> was successful </h1> 
                    <div>`      :
    
                    /**
                     * Dsplays a successful checked in message to the browser
                     */
                    `<div style='background-color : white ;text-align:center; 
                    border-radius : 10px ; height:200px; border-top:2px solid green; 
                    border:3px solid green;border-bottom-right-radius:100px;
                    -webkit-box-shadow: -4px 4px 38px -9px rgba(0,0,0,0.42);
                    -moz-box-shadow: -4px 4px 38px -9px rgba(0,0,0,0.42);
                    box-shadow: -4px 4px 38px -9px rgba(0,0,0,0.42);
                    z-index: 54;
                    border-bottom-left-radius:100px'>
    
                        <div>
                            <h5>Firstname: ${fields['rows'][0].vendorname}  <br/> Phone Number: ${fields['rows'][0].phonenumber} </h5>
                        </div>
                        <h1 style='color : green;text-align: center'> Message :- Vendor <strong>CHECKED IN</strong> was successful </h1> 
                    <div>`;
     
                
                    /**
                     * Updates the last time the user checked out from the system
                     */
                    if (fields.rows[0].checked_in === !0 ) {
                        pool.query("UPDATE vendors SET last_checked_out = now() WHERE vendorname=$1 and phonenumber=$2", [vendorname,phonenumber], (error, fields) => {
                            if (error) {
                                console.log("Error", error)
                            } else {
                                console.log("LAST CHECKED IN SET FOR ", vendorname,phonenumber)
                            }
                        });
    
                    /**
                     * Updates the last time the vendor checked into the system
                     */
                    } else {
                        pool.query("UPDATE vendors SET last_checked_in = now() WHERE vendorname=$1 and phonenumber=$2", [vendorname,phonenumber], (error, fields) => {
                            if (error) {
                                console.log("Error", error);
                            } else {
                                console.log("LAST CHECKED OUT SET FOR ", vendorname,phonenumber)
                            }
                        });
                    }
                    /**
                     * Negates the current state of the vendor logged into the system
                     */
    
                    pool.query("UPDATE vendors SET checked_in = NOT checked_in WHERE vendorname=$1 and phonenumber=$2", [vendorname, phonenumber], (error, fields, results) => {
                        
                        if (error) {
                            console.error(error);
    
                            response.send(`
                               <div style='border-radius: 10px; box-shadow: 3px 10px 10px #ddd; height: 400px; width: 700px'>
                                    <h1 style= 'margin-top: 2% ;text-align: center ;color:red; border: 5px solid red ; padding: 30px ;'>
                                        [ Server Error ] - Qr Code Checking/Out was not successful <br/> Contact the system administrator
                                    </h1>
                               </div>
                              `);
    
                        } else {
                            console.log("Operation was perform on ", vendorURL);
                            response.send(message);
                        }
                    });
                }
            }
        });
});



vendor.get("/qrcode/authenticate/stage", (request, response, error) => {

    var vendorname = request.query.vendorname;
    var phonenumber = request.query.phonenumber;
    var standnumber = request.query.standnumber ;
    var commodities = request.query.commodities;

    console.log(vendorname,phonenumber,standnumber,commodities) ;
    // var file = fs.createReadStream(path.join(__dirname, "/confirm_check.html"));
    response.redirect(`/confirm_vendor_check.html?vendorname=${vendorname}&phonenumber=${phonenumber}&standnumber=${standnumber}&commodities=${commodities}`);

    console.log(vendorname,phonenumber,standnumber,commodities) ;

    
});



/**
 * 
 */
vendor.get("/checked/state", (request, response, error) => {
    var vendorname = request.query.vendorname;
    var phonenumber = request.query.phonenumber;
    var standnumber = request.query.standnumber;
    var commodities = request.query.commodities;

    // console.log("--------STATE CHECKING MODE-----", vendorname,phonenumber,standnumber,commodities)

    pool.query("SELECT checked_in FROM vendors where vendorname=$1 AND phonenumber=$2 AND standnumber=$3 AND commodities=$4", [vendorname,phonenumber,standnumber,commodities], (error, result) => {
        if (error) {
            console.log(Error, error);
            response.send("Status 500 : Server Error")

            fs.appendFile("server.app.log","----------------------------------"+new Date().toString()+"-----------------------------------------")
            fs.appendFile("server.app.log",error) ;

        } else {
            if (result.rows[0]) {

                response.json({"checked_in": result.rows[0].checked_in });
                console.log(result.rows[0]) ;
                console.log("State was checked ", vendorname,phonenumber);
            } else {
                response.json({"not_found": "Not Registered"});
            }
        }
    })
});


/**
 * The serves the request to populate the vendors table on the admin dashboard
 */
vendor.get("/vendors/all/:limit/:offSet", (request, response, error) => {
    var limit = request.params.limit;
    var offSet = request.params.offSet;

        pool.query(`SELECT vendorname , datecreated, phonenumber ,last_checked_in, last_checked_out , checked_in,commodities,standnumber,gender FROM vendors ORDER BY vendorname LIMIT ${limit}  OFFSET ${offSet}`, function(error, result) {
            if (error) {
                console.log(error);
                response.send("SERVER ERROR... Please Contact the server administrator");
    
                fs.appendFile("server.app.log","----------------------------------"+new Date().toString()+"-----------------------------------------\n",()=>{})
                fs.appendFile("server.app.log",error,()=>{}) ;
    
            } else {
                response.json(result.rows);
                console.log("All vendor was requested... response was successful");
                console.log("VENDORS======>",result)
            }
        })
   
});






var excelGeustDate = "" ;
emitter.on("excel-date-created", (dateString)=>{
    excelGeustDate = dateString ;
})

vendor.post("/upload/xlsx/generate/qr-image" , upload.any() , (request , response , error)=>{
    var dateCreated = new Date();

    console.log("THis is the date created ", dateCreated) ;

    

    var imageQrCodeDir = masterDirFolder+"/"+allQrImageDirectory+"/"+dateCreated.toString(); //this is where the new files will be written into 
    console.log("DIRECTORY : ","HELLO");
    console.log(imageQrCodeDir)
    
    
    if (request.files[0] != undefined){
        var excelFile = request.files[0].buffer ;
    console.log("Excel File received", excelFile , "FILE NAME ====> " , request.files[0]) ;


    fs.writeFileSync(__dirname + "/guest-qrcode-images/excelfile_received.1.xlsx",excelFile);

    /**
     * Generate the JSON format for the excel file recieved
     */
    const result = excelToJson({
        sourceFile: __dirname + "/guest-qrcode-images/excelfile_received.1.xlsx"
    });


    var vendorsArray = result.Sheet2 ; 
    console.log(vendorsArray) ; 

    //remove the header from the array object
    result.Sheet2.splice(0,1) ;
    var vendorsArray = result.Sheet2 ;

    //store the vendor array objects 
    var vendors = [] ;


    vendorsArray.forEach(vendor => {
        var newvendor =  {"vendorname" :vendor.A,"phonenumber":vendor.B,"gender":vendor.C ,"commodities":vendor.D,"standnumber":vendor.E};
        vendors.push(newvendor) ;
    });

    try{
        createVendorQrAdd(vendors,imageQrCodeDir,response,dateCreated.toString()) ;

    }catch (error){
        fs.appendFile("server.app.log",+new Date().toString()+"-----------------------------------------\n",()=>{})
        fs.appendFile("server.app.log",error,()=>{}) ;
        console.log(error);
    }finally {
        console.log("Add ");
    }
    }else{
        response.send() ;
    }
});



/**
 * Download all the generated Qr-Code image
 */
vendor.get("/generated-qr-image/zipfile/download",(request,response,error)=>{


    var dateCreated = JSON.parse(request.query.dateCreated) ; 

    var date = dateCreated.date ;

    console.log("Date created is recieved" , dateCreated , date)
        

    var imageQrCodeDir = path.join(masterDirFolder,allQrImageDirectory) ;
    var zipFileName = "guest-qrimages"+new Date().getMilliseconds()+".zip" ;


    console.log(imageQrCodeDir)
    console.log("/guest-qrcode-images/"+allQrImageDirectory+"/"+date+"/"+zipFileName);

    /**the zip helper function to create and help the browser agent download the zip file */
    zipHelperFunction(imageQrCodeDir,zipFileName,date, response) ;
});



vendor.get("/generated-qr-image/zipfile/download/xlsx",(request,response,error)=>{

    var date = excelGeustDate ;

    console.log("Date created is recieved" , date)

    var imageQrCodeDir = path.join(masterDirFolder,allQrImageDirectory) ;
    var zipFileName = "guest-qrimages"+new Date().getMilliseconds()+".zip" ;


    console.log(imageQrCodeDir)
    console.log("/guest-qrcode-images/"+allQrImageDirectory+"/"+date+"/"+zipFileName);

    /**the zip helper function to create and help the browser agent download the zip file */
    zipHelperFunction(imageQrCodeDir,zipFileName,date, response) ;
});


/**
 * 
 * @param {*} imageQrCodeDir  the image files directory to zip
 * @param {*} zipFileName     the the zip filename to be created when the it is passed to the zip generator
 * @param {*} date            the date the to be attached with the zip filename
 * @param {*} response        typeof Object  - the response object of the route where the request was sent to.
 */
function zipHelperFunction(imageQrCodeDir,zipFileName,date, response) {        
    //    calls the helper function to create the zip folder
       const {output , archive}  = createVendorQrimageZip(imageQrCodeDir,zipFileName,date);
       console.log("/guest-qrcode-images/"+allQrImageDirectory+"/"+date+"/"+zipFileName);
    
        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
    
        archive.finalize(); //call the finalize when all the files has been writen to the zip folder
    
        output.on('close', function() {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
    
        //finalize the archive (ie we are done appending files but streams have to finish yet)
            // archive.finalize(); //call the finalize when all the files has been writen to the zip folder
            /**
             * Send the zip folder to the agent's browser to download
             */
            response.send("/guest-qrcode-images/"+allQrImageDirectory+"/"+zipFileName);
            // console.log("Response Object" ,response)
        });
    }



    /**
 * 
 * @param {*} folderToZip  This is the folder directory to be zippped
 * @param {*} folderName   This is the name of the folder the server will sent to the pool Agent to download
 */
function createVendorQrimageZip(folderToZip , folderName ,date){
    try {
             // create a file to stream archive data to.
        var output = fs.createWriteStream(folderToZip+"/"+ folderName );
       
        var archive = archiver('zip', {
          zlib: { level: 9 } // Sets the compression level.
        });
        // good practice to catch this error explicitly
        archive.on('error', function(err) {
           fs.appendFile("server.app.log","----------------------------------"+new Date().toString()+"-----------------------------------------\n",()=>{})
           fs.appendFile("server.app.log",error,()=>{}) ;
          throw err;
        });
         
        // pipe archive data to the file
        archive.pipe(output);
          
        // append files from a sub-directory, putting its contents at the root of archive
        archive.directory(folderToZip +"/"+date+"/", false);
        
        /**returns the archiver and the output */
        return {output , archive}
        
    } catch (error) {
        console.log("ERROR" , error)
        fs.appendFile("server.app.log","----------------------------------"+new Date().toString()+"-----------------------------------------\n",()=>{})
           fs.appendFile("server.app.log",error,()=>{}) ;
    }
      
   }


   try {
    setInterval(()=>{
        if(fs.existsSync(masterDirFolder) === true){
            console.log("DIRECTORY" , path.join(masterDirFolder ,"/"+months[ new Date().getMonth()]+"-"+new Date().getFullYear()))
               if(fs.existsSync(path.join(masterDirFolder ,"/"+months[ new Date().getMonth()]+"-"+new Date().getFullYear()))){
                   console.log("The Month directory exists.")
               }else{
                   console.log("-----------------The Month directory does not exist------------------------")
                   fs.mkdirSync(path.join(masterDirFolder , allQrImageDirectory) );
                   console.log("[+-+-+->] Month Directory is created...", new Date().toString());
               }
           }
           else{
               fs.mkdirSync(masterDirFolder,(error)=>{
                   if(error === error.code ){
                       console.log("ERROR_OCCURED_WHILE_CREATING_DIRECTORY : ", masterDirFolder , error);
                       fs.appendFile("server.app.log","----------------------------------"+new Date().toString()+"-----------------------------------------\n",()=>{})
                       fs.appendFile("server.app.log",error,()=>{}) ;
                   }else{
                       console.log("DIRECTORY_CREATED_SUCCESSFULLY -:- ",masterDirFolder)
                   } // END ELSE
               })
           } // END ELSE
   },259200000);
}catch (error){
    console.log(error);
    fs.appendFile("server.app.log","----------------------------------"+new Date().toString()+"-----------------------------------------\n",()=>{})
        fs.appendFile("server.app.log",error,()=>{}) ;

}



/**
 * 
 * @param {Array :[Objects] } vendors The vendor array of objects to add to the database 
 * @param {Path : string } imageQrCodeDir The directory to write the images generated 
 */
function createVendorQrAdd(vendors,imageQrCodeDir, response , dateCreated){

    folderCheck();

    fs.mkdir(imageQrCodeDir , 0755, function (err) {
        if (err) {} 
      });
    
    vendors.forEach(element => {

        var vendorname = element.vendorname === undefined ? "Nill" :  typeof element.vendorname === "number" ? element.vendorname.toString().replace(/\s+/g,'-') : element.vendorname.replace(/\s+/g,'-');
        var phonenumber = element.phonenumber === undefined ? "Nill" : typeof element.phonenumber === "number" ? element.phonenumber.toString().replace(/\s+/g,'-') : element.phonenumber.replace(/\s+/g,'-');
        var gender = element.gender === undefined ?"Nill" : typeof element.gender === "number" ? element.gender.toString().replace(/\s+/g,'-') : element.gender.replace(/\s+/g,'-');
        var commodities = element.commodities === undefined ?"Nill" : typeof element.commodities === "number" ? element.commodities.toString().replace(/\s+/g,'-') : element.commodities.replace(/\s+/g,'-');
        var standnumber = element.standnumber === undefined ?"Nill" : typeof element.standnumber === "number" ? element.standnumber.toString().replace(/\s+/g,'-') : element.standnumber.replace(/\s+/g,'-');

        console.log(vendorname,phonenumber,gender,commodities,standnumber)


        // console.log("HOME ADDRESS", home_address);
       
        vendorEncodedURL = `${staticURL}/vendor/qrcode/authenticate/stage/?vendorname=${vendorname}&phonenumber=${phonenumber}&commodities=${commodities}&standnumber=${standnumber}`;



        var vendorHashed = hasher(vendorEncodedURL);

        console.log(vendorEncodedURL)
        pool.query("INSERT INTO vendors(id,hashcode,datecreated,last_checked_in ,last_checked_out,checked_in,phonenumber,standnumber,gender,vendorname,commodities) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT (hashcode) DO NOTHING", [uuid_generator(), vendorHashed, new Date(), null, null, !1, phonenumber,standnumber,gender,vendorname, commodities], function(error, fields) {
            if (error) {
                console.log("vendor already created and it exist",error);
                emitter.emit("Error occured while creating the user")
                fs.appendFile("server.app.log","----------------------------------"+new Date().toString()+"-----------------------------------------\n",()=>{})
                fs.appendFile("server.app.log",error,()=>{}) ;
                emitter.emit('error',vendorname + "-" + "-" + "-" + phonenumber + "-"+commodities+"did not create...\n")
            }else{          
                    console.log(vendorname,phonenumber,gender,commodities,standnumber,"ADDED SUCCESSFULLY!")
                    emitter.emit("success",vendorname + "-" +"-"+ phonenumber +"-"+gender+"-"+commodities+ " created...\n");
            }
        });
    });


    console.log("vendor array is exhausted...",counter);

    // emitter.on("vendor-excel-write-complete",()=>{

        var counter = 0 ;
 
        vendors.forEach(element=>{

        ++counter ;

        var vendorname = element.vendorname === undefined ? "Nill" :  typeof element.vendorname === "number" ? element.vendorname.toString().replace(/\s+/g,'-') : element.vendorname.replace(/\s+/g,'-');
        var phonenumber = element.phonenumber === undefined ? "Nill" : typeof element.phonenumber === "number" ? element.phonenumber.toString().replace(/\s+/g,'-') : element.phonenumber.replace(/\s+/g,'-');
        var commodities = element.commodities === undefined ? "Nill":typeof element.commodities === "number" ? element.commodities.toString().replace(/\s+/g,'-') : element.commodities.replace(/\s+/g,'-');
        var standnumber = element.standnumber === undefined ?"Nill" : typeof element.standnumber === "number" ? element.standnumber.toString().replace(/\s+/g,'-') : element.standnumber.replace(/\s+/g,'-');

        vendorEncodedURL = `${staticURL}/vendor/qrcode/authenticate/stage/?vendorname=${vendorname}&phonenumber=${phonenumber}&commodities=${commodities}&standnumber=${standnumber}`;

        var filename = vendorname+ "-" + phonenumber + "-" + standnumber+"-"+commodities;


        writeImageQrCode(vendorEncodedURL, filename, imageQrCodeDir);
        emitter.emit('success', filename + " successfully created\n");

            if(counter === vendors.length ){
                    emitter.emit("excel-date-created", dateCreated);
                    console.log("excel date Created" , dateCreated)
                    emitter.emit("vendor-excel-write-complete");
            }
        })

        response.send({"error": errorMessage , "success":successMessage});
        //remmove all the messages after the messages are being sent to the browser
        errorMessage = "";
        successMessage = "";
}



/**
 * 
 * @param {*} vendors 
 * @param {*} imageQrCodeDir 
 * @param {*} response 
 */
function addNewVendor(vendors ,imageQrCodeDir,response) {

    errorMessage = "";
    successMessage = "";
    
    var dateCreated = "" ;
    folderCheck();

    fs.mkdir(imageQrCodeDir , 0755, function (err) {
        if (err) {} 
      });

    var counter = 0;
    vendors.forEach(element => {
        dateCreated = new Date();

        var vendorname = element.vendorname === undefined ? "Nill" :  typeof element.vendorname === "number" ? element.vendorname.toString().replace(/\s+/g,'-') : element.vendorname.replace(/\s+/g,'-');
        var phonenumber = element.phonenumber === undefined ? "Nill" : typeof element.phonenumber === "number" ? element.phonenumber.toString().replace(/\s+/g,'-') : element.phonenumber.replace(/\s+/g,'-');
        var gender = element.gender === undefined ? "Nill": typeof element.gender === "number" ? element.gender.toString().replace(/\s+/g,'-') : element.gender.replace(/\s+/g,'-');
        var commodities = element.commodities === undefined ?"Nill" : typeof element.commodities === "number" ? element.commodities.toString().replace(/\s+/g,'-') : element.commodities.replace(/\s+/g,'-');
        var standnumber = element.standnumber === undefined ?"Nill" : typeof element.standnumber === "number" ? element.standnumber.toString().replace(/\s+/g,'-') : element.standnumber.replace(/\s+/g,'-');




        vendorEncodedURL = `${staticURL}/vendor/qrcode/authenticate/stage/?vendorname=${vendorname}&phonenumber=${phonenumber}&commodities=${commodities}&standnumber=${standnumber}`;



        var vendorHashed = hasher(vendorEncodedURL);


        console.log(vendorEncodedURL)
        pool.query("INSERT INTO vendors(id,hashcode,datecreated,last_checked_in ,last_checked_out,checked_in,phonenumber,standnumber,gender,vendorname,commodities) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT (hashcode) DO NOTHING", [uuid_generator(), vendorHashed, new Date(), null, null, !1, phonenumber,standnumber,gender,vendorname, commodities], function(error, fields) {
           
            console.log(vendorname,phonenumber,gender,commodities,standnumber,"------------------------------->>>>>>ADDED SUCCESSFULLY!<<<<<<--------------------------------")

            if (error) {
                console.log("vendor already created and it exist",error);
                emitter.emit("Error occured while creating the user")
                fs.appendFile("server.app.log","----------------------------------"+new Date().toString()+"-----------------------------------------\n",()=>{})
                fs.appendFile("server.app.log",error,()=>{}) ;
            }else{

                // console.log(vendorname,phonenumber,gender,commodities,standnumber,"------------------------------->>>>>>ADDED SUCCESSFULLY!<<<<<<--------------------------------")


                emitter.emit("success",vendorname + "-" +"-"+ phonenumber +"-"+gender+"-"+commodities+ " created...\n");
            }
        });
    });

    console.log("vendor array is exhausted...",counter);

    // emitter.on("vendor-excel-write-complete",()=>{

        var counter = 0 ;

        vendors.forEach(element=>{

        ++counter ;

        var vendorname = element.vendorname === undefined ? "Nill" :  typeof element.vendorname === "number" ? element.vendorname.toString().replace(/\s+/g,'-') : element.vendorname.replace(/\s+/g,'-');
        var phonenumber = element.phonenumber === undefined ? "Nill" : typeof element.phonenumber === "number" ? element.phonenumber.toString().replace(/\s+/g,'-') : element.phonenumber.replace(/\s+/g,'-');
        var commodities = element.commodities === undefined ? "Nill" : typeof element.commodities === "number" ? element.commodities.toString().replace(/\s+/g,'-') : element.commodities.replace(/\s+/g,'-');
        var standnumber = element.standnumber === undefined ? "Nill": typeof element.standnumber === "number" ? element.standnumber.toString().replace(/\s+/g,'-') : element.standnumber.replace(/\s+/g,'-');



        var filename = vendorname+ "-" + phonenumber + "-" + standnumber+"-"+commodities;

        console.log("FILE NAME OF THE VENDOR",filename)

        vendorEncodedURL = `${staticURL}/vendor/qrcode/authenticate/stage/?vendorname=${vendorname}&phonenumber=${phonenumber}&commodities=${commodities}&standnumber=${standnumber}`;

        writeImageQrCode(vendorEncodedURL, filename, imageQrCodeDir);
        emitter.emit('success', filename + " successfully created\n");

            if(counter === vendors.length ){
                    emitter.emit("excel-date-created", dateCreated);
                    console.log("excel date Created" , dateCreated)
                    emitter.emit("vendor-excel-write-complete");
            }
        })

    response.json({
        "error": errorMessage,
        "success": successMessage
    });
    errorMessage = "";
    successMessage = "";
}



/**
 * 
 * @param {*} dataToEncode This is the has the data to encode into QR
 * @param {*} filename The file name to save the image qr as 
 * @param {*} dirToWriteQrCodes the mother directory to write the file into
 */
function writeImageQrCode(dataToEncode, filename, dirToWriteQrCodes) {
    // console.log("AFTER ====>", dataToEncode);
    var qr_png = qr.image(dataToEncode, {
        type: 'png'
    });
    /**
     * Writes the file into the the current directory/dirToWriteQrCodes
     */
    try{
        var rs = fs.createWriteStream(dirToWriteQrCodes +"/"+ filename + ".png") ;
        qr_png.pipe(rs);
        rs.on("error",function(error){

            fs.appendFile("server.app.log",new Date().toString()+"-----------------------------------------\n",()=>{})
            fs.appendFile("server.app.log",error,()=>{}) ;

            console.log(error) ;
            
        });

        qr_png.on('close',()=>{
            rs.close();
        })
        console.log("done writing image!", filename);
    }catch (error){
       console.log(error);
       fs.appendFile("server.app.log",new Date().toString()+"-----------------------------------------\n",()=>{})
       fs.appendFile("server.app.log",error,()=>{}) ;

    }finally{
        
    }
   
}



module.exports = vendor ; //exports the vendor router to the server application