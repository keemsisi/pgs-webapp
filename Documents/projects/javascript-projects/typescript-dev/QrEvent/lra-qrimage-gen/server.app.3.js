/**
 * Libraries for the server to use
 */

var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var qr = require('qr-image');
var hasher = require('object-hash');
var uuid_generator = require('uuid/v1');
var exportedVars = require('./server-variables');
var EventEmitter = require('events');
const excelToJson = require('convert-excel-to-json');
var multer = require('multer');
var archiver = require('archiver');

var months = ["JANUARY","FEBUARY","MATCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"] ;


var allQrImageDirectory = months[new Date().getMonth()]+"-"+new Date().getFullYear();
var masterDirFolder = path.join(__dirname ,"/guest-qrcode-images");


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
    }
}






//a  midware to extract the files the user has sent to the server 
/**middleware to intercept the request and guest the files and the fields in the body of the request */
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
// var staticURL = "http://cedarqr-image-gen.appspot.com";
var staticURL = "http://localhost:4040";

var qr_svg = qr.image('lasisi akeem adeshina gifted11 lasisis is a good programmer', {
    type: 'png'
});

var guestshash = new Set([]);
var successSetBuffer = new Set([]);
var errorSetBuffer = new Set([]);
var guestEncodedURL = "";
var mysql_connector = require('mysql');
const {
    Pool, Client
} = require('pg'); 
const pool = new Pool();

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'cedarqrcode',
    password: 'postgres',
    port: 5432,
});


// const client = new Client({
//         user: 'postgres',
//         host: '35.232.105.29',
//         database: 'cedarqrimagegen_db',
//         password: 'postgres',
//         port: 5432,
//     });

console.log("Message connection", client.connect());

console.log("[+] The connection to the PSQL cedarqrcode database was successful!");
var app = express();

app.set('ttile', "Latter Rain Assembly Guest QR");
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({
    extended: !0,
    limit: 50000000000,
    parameterLimit: 1000000000000000000
}));


var httpServer = http.createServer(app);
app.get('/', (request, response, error) => {
    response.send("guranted")
});

folderCheck() ; //check if the folder exist, if it does not exist then it creates a new one 
app.get("/generate/qrcode/new/all", (request, response, error) => {

    var creationDate = JSON.parse (request.query.dateCreated ) ;
    console.log(creationDate.date) 

    var imageQrCodeDir = masterDirFolder+"/"+allQrImageDirectory+"/"+creationDate.date; //this is where the new files will be written into 
    console.log("DIRECTORY : ","HELLO");
    console.log(imageQrCodeDir)


    var guests = JSON.parse(request.query.data);
    console.log(guests.length);


    /**
     * make the new directory for the image files to be uploaded into 
     * */
    try {
        addNewGuest(guests ,imageQrCodeDir,response) ;
    }catch (error){
        console.log(error);
    }finally{
        console.log("Request received...");
    }      
});





app.get("/guest/qrcode/authenticate", function(request, response, error) {
    var firstname = request.query.firstname;
    var lastname = request.query.lastname;
    var phonenumber = request.query.phonenumber;
    var guestURL = `${staticURL}/guest/qrcode/authenticate/stage/?firstname=${firstname}&lastname=${lastname}&phonenumber=${phonenumber}`;
    var guestHashcode = hasher(guestURL);
    console.log(hasher("http://cedarqr-image-gen.appspot.com/guest/qrcode/authenticate/?firstname=Lasisi&lastname=Akeem&phonenumber=08032571534"));
    console.log("CONDITION CASE", hasher(guestURL) === "a93c5884105bda5906ba8c1ee67aee4c5efe7390");
    client.query("SELECT firstname,lastname,phonenumber,checked_in FROM registeredguest WHERE firstname=$1 and lastname=$2 and phonenumber=$3", [firstname, lastname, phonenumber], (error, fields) => {
        var message = "";
        var condition = !1;
        if (error) {
            console.error("Error Occured in the database", JSON.parse(error).Error);
            response.send(`<h1
            style= 'margin-top: 2% ;text-align: center ;color:red; border: 5px solid red ; padding: 30px ;'>
            [ Server Error ] - Qr Code Checking/Out was not successful <br/> Contact the system administrator</h1>`)
        } else {
            console.log("RESULTS=====>", fields)
            if (typeof fields.rows[0] === 'undefined') {
                message = `<div style = 'border : 2px solid red; border-radius : 10px ;'>
                <h1 style='color : green; paddind: 10px ;'> Message :=:=: Sorry Guest <br/> 
                Firstname : ${firstname} <br/> Lastname : ${lastname} <br/> Phone Number : ${phonenumber}<br/>
                <strong style='color : red'>IS NOT REGISTERED</strong>
                </h1>
              <div>`;
                console.log(fields);
                condition = !0;
                response.send(message)
            } else {
                message = fields.rows[0].checked_in === !0 ? `<div style='background-color : white ;text-align:center; 
                border-radius : 10px ; height:200px; border-top:10px solid yellow; 
                border:3px solid orange;border-bottom-right-radius:100px;
                border-bottom-left-radius:100px'> 
                        <div>
                            <h5>Firstname: ${fields['rows'][0].firstname} <br/> Lastname: ${fields['rows'][0].lastname} <br/> Phone Number: ${fields['rows'][0].phonenumber} </h5>
                        </div>
                        <h1 style='color : green; text-align: center'> Message :- Guest <strong>CHECKED OUT</strong> was successful </h1> 
                <div>` : `<div style='background-color : white ;text-align:center; 
                border-radius : 10px ; height:200px; border-top:2px solid green; 
                border:3px solid green;border-bottom-right-radius:100px;
                border-bottom-left-radius:100px'>
                    <div>
                        <h5>Firstname: ${fields['rows'][0].firstname} <br/> Lastname: ${fields['rows'][0].lastname} <br/> Phone Number: ${fields['rows'][0].phonenumber} </h5>
                    </div>
                    <h1 style='color : green;text-align: center'> Message :- Guest <strong>CHECKED IN</strong> was successful </h1> 
                <div>`;
                if (fields.rows[0].checked_in === !0) {
                    client.query("UPDATE RegisteredGuest SET last_checked_out = now() WHERE firstname=$1 and lastname=$2 and phonenumber=$3", [firstname, lastname, phonenumber], (error, fields) => {
                        if (error) {
                            console.log("Error", error)
                        } else {
                            console.log("LAST CHECKED IN SET FOR ", firstname, lastname, phonenumber)
                        }
                    })
                } else {
                    client.query("UPDATE RegisteredGuest SET last_checked_in = now() WHERE firstname=$1 and lastname=$2 and phonenumber=$3", [firstname, lastname, phonenumber], (error, fields) => {
                        if (error) {
                            console.log("Error", error)
                        } else {
                            console.log("LAST CHECKED OUT SET FOR ", firstname, lastname, phonenumber)
                        }
                    });
                }
                client.query("UPDATE RegisteredGuest SET checked_in = NOT checked_in WHERE firstname=$1 and lastname=$2 and phonenumber=$3", [firstname, lastname, phonenumber], (error, fields, results) => {
                    if (error) {
                        console.error(error);
                        response.send(`
                           <div style='border-radius: 10px; box-shadow: 3px 10px 10px #ddd; height: 400px; width: 700px'>
                                <h1 style= 'margin-top: 2% ;text-align: center ;color:red; border: 5px solid red ; padding: 30px ;'>
                                    [ Server Error ] - Qr Code Checking/Out was not successful <br/> Contact the system administrator
                                </h1>
                           </div>
                          `)
                    } else {
                        console.log("Operation was perform on ", guestURL);
                        response.send(message)
                    }
                })
            }
        }
    })
});

/**
 * 
 * @param {*} dataToEncode This is the has the data to encode into QR
 * @param {*} filename The file name to save the image qr as 
 * @param {*} dirToWriteQrCodes the mother directory to write the file into
 */
function writeImageQrCode(dataToEncode, filename, dirToWriteQrCodes) {
    var qr_png = qr.image(dataToEncode, {
        type: 'png'
    });
    /**
     * Writes the file into the the current directory/dirToWriteQrCodes
     */
    qr_png.pipe(fs.createWriteStream(dirToWriteQrCodes +"/"+ filename + ".png"));
    console.log("done writing image!", filename)
}




app.get("/guest/qrcode/authenticate/stage", (request, response, error) => {
    var firstname = request.query.firstname;
    var lastname = request.query.lastname;
    var phonenumber = request.query.phonenumber;
    var file = fs.createReadStream(path.join(__dirname, "/confirm_check.html"));
    response.redirect(`/confirm_check.html?firstname=${firstname}&lastname=${lastname}&phonenumber=${phonenumber}`)
});

app.get("/guest/checked/state", (request, response, error) => {
    var firstname = request.query.firstname;
    var lastname = request.query.lastname;
    var phonenumber = request.query.phonenumber;

    console.log(firstname,lastname,phonenumber)

    var guestHashcode = hasher(`${staticURL}/guest/qrcode/authenticate/stage/?firstname=${firstname}&lastname=${lastname}&phonenumber=${phonenumber}`);
    client.query("SELECT checked_in FROM registeredguest where firstname=$1 AND lastname=$2 AND phonenumber=$3", [firstname,lastname,phonenumber], (error, result) => {
        if (error) {
            console.log(Error, error);
            response.send("Status 500 : Server Error")
        } else {
            if (result.rows[0]) {
                response.send(JSON.stringify({
                    "checked_in": result.rows[0].checked_in
                }));
                console.log("STATE RESULT :",result.rows[0])
                console.log("State was checked ", firstname, lastname, phonenumber)
            } else {
                response.send(`<div class="container" style = 'border : 2px solid red; border-radius : 10px ; margin: 0 auto ; display: flex ;'>
                <h1 style='color : green; paddind: 10px ;'> Message :=:=: Sorry Guest Authentication Failed <br/> 
                Firstname : ${firstname} <br/> Lastname : ${lastname} <br/> Phone Number : ${phonenumber}<br/>
                <strong style='color : red'>IS NOT REGISTERED</strong>
                </h1>
                <div>`)
                console.log("NOT REGISTERED",firstname,lastname,phonenumber)
            }
        }
    })
});
app.get("/guest/registeredguest/all/:limit/:offSet", (request, response, error) => {
    var limit = request.params.limit;
    var offSet = request.params.offSet;
    client.query(`SELECT firstname , lastname ,datecreated, phonenumber ,last_checked_in, last_checked_out , checked_in,home_address ,house_color ,gender,age FROM registeredguest LIMIT ${limit}  OFFSET ${offSet}`, function(error, result) {
        global.counter = 99999999;
        if (error) {
            console.log(error);
            response.send("SERVER ERROR... Please Contact the server administrator")
        } else {
            response.json(result.rows);
            console.log("All guest was requested... response was successful")
        }
    })
});
app.get("/guest/registeredguest/count/all", (request, response, error) => {
    client.query(`select count(id) from registeredguest`, function(error, result) {
        if (error) {
            console.log(error);
            response.send("SERVER ERROR... Please Contact the server administrator")
        } else {
            response.json(result);
            console.log("All guest were counted... response was successful")
        }
    })
});


/**
 * counts the number of guest registered in the database 
 */
app.get("/guest/registeredguest/count", (request, response, error) => {
    var queryCount = request.query.argv;
    console.log(queryCount);
    if (queryCount != undefined) {
        client.query(`select count(checked_in) from registeredguest where checked_in=$1`, [queryCount], function(error, result) {
            if (error) {
                console.log(error);
                response.send("SERVER ERROR... Please Contact the server administrator")
            } else {
                response.json(result);
                console.log("Some Checked in guest were counted!")
            }
        })
    }
});

/**
 * Counts the number of registered males and females in the database
 */
app.get("/guest/count/gender", (request, response, error) => {
   
        client.query(` select count(gender) from registeredguest where gender='Male' UNION ALL  select count(gender)  from registeredguest where gender='Female';`, function(error, result) {
            if (error) {
                console.log(error);
                response.send("SERVER ERROR... Please Contact the server administrator")
            } else {
                response.json(result);
                console.log("Registered guest gender were counted!");
            }
        })
});



app.get("/test", (request, response, error) => {
    client.query("SELECT * FROM RegisteredGuest limit 5", (error, fields) => {
        response.send(fields)
    })
})



// const excelToJson = require('convert-excel-to-json');
 
// const result = excelToJson({
//     sourceFile: 'SOME-EXCEL-FILE.xlsx'
// });


app.post("/guest/upload/xlsx/generate/qr-image" , upload.any() , (request , response , error)=>{


    // var creationDate = JSON.parse (request.query.dateCreated ) ;
    // // console.log(creationDate.date) 

    var imageQrCodeDir = masterDirFolder+"/"+allQrImageDirectory+"/"+new Date(); //this is where the new files will be written into 
    console.log("DIRECTORY : ","HELLO");
    console.log(imageQrCodeDir)


    // var guests = JSON.parse(request.query.data);
    // console.log(guests.length);
    
    // var dateCreated = JSON.parse(request.query.dateCreated) ; 
    // var date = dateCreated.date ; 

    // var imageQrCodeDir = path.join(masterDirFolder,allQrImageDirectory) ;
    // var zipFileName = "guest-qrimages"+new Date().getMilliseconds()+".zip" ;


    // console.log(imageQrCodeDir)
    // console.log("/guest-qrcode-images/"+allQrImageDirectory+"/"+date+"/"+zipFileName);

    var excelFile = request.files[0].buffer ;
    console.log("Excel File received", excelFile) ;


    fs.writeFileSync(__dirname + "/guest-qrcode-images/excelfile_received.xlsx",excelFile);

    /**
     * Generate the JSON format for the excel file recieved
     */
    const result = excelToJson({
        sourceFile: __dirname + "/guest-qrcode-images/excelfile_received.xlsx"
    });


    var guestsArray = result.Sheet1 ; 
    console.log(guestsArray) ; 

    //remove the header from the array object
    result.Sheet1.splice(0,1) ;
    var guestsArray = result.Sheet1 ;

    //store the guest array objects 
    var guests = [] ;


    guestsArray.forEach(guest => {
        var newGuest =  {"firstname" :guest.A,"lastname":guest.B,"phonenumber":guest.C,"homeAddress":guest.D,"houseColor":guest.E ,"gender":guest.F,"age":guest.G};
        guests.push(newGuest) ;
        console.log(newGuest);
    });

    try{
        addNewGuest(guestsArray,imageQrCodeDir,response) ;
    }catch (error){
        console.log(error);
    }finally {
        console.log("Add ")
    }
});


/**
 * Download all the generated Qr-Code image
 */
app.get("/guest/generated-qr-image/zipfile/download",(request,response,error)=>{

    var dateCreated = JSON.parse(request.query.dateCreated) ; 
    var date = dateCreated.date ; 

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
   const {output , archive}  = createGestQrimageZip(imageQrCodeDir,zipFileName,date);
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
    });
}


/**
 * 
 * @param {*} folderToZip  This is the folder directory to be zippped
 * @param {*} folderName   This is the name of the folder the server will sent to the client Agent to download
 */
function createGestQrimageZip(folderToZip , folderName ,date){
 try {
          // create a file to stream archive data to.
     var output = fs.createWriteStream(folderToZip+"/"+ folderName );
    
     var archive = archiver('zip', {
       zlib: { level: 9 } // Sets the compression level.
     });
     // good practice to catch this error explicitly
     archive.on('error', function(err) {
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
                   console.log("[++++++++] Month Directory is created...", new Date().toString());
               }
           }
           else{
               fs.mkdirSync(masterDirFolder,(error)=>{
                   if(error === error.code ){
                       console.log("ERROR_OCCURED_WHILE_CREATING_DIRECTORY : ", masterDirFolder , error);
                   }else{
                       console.log("DIRECTORY_CREATED_SUCCESSFULLY -:- ",masterDirFolder)
                   } // END ELSE
               })
           } // END ELSE
   },259200000);
}catch (error){
    console.log(error);
}



// /**
//  * 
//  * @param {Array :[Objects] } guests The guest array of objects to add to the database 
//  * @param {Path : string } imageQrCodeDir The directory to write the images generated 
//  */
// function addNewGuest(guests,imageQrCodeDir){
//     console.log("_------------------------------------I AM HERE -----------------_____-------")
//     var dateCreated = "" ;
//     folderCheck();

//     fs.mkdir(imageQrCodeDir , 0755, function (err) {
//         if (err) {} 
//       });

//     guests.forEach(element => {

//         console.log(element);

//         dateCreated = new Date();
//         var firstname = element.A === undefined ? "Nill" : element.A.replace(/\s+/g,'-');
//         var lastname = element.B === undefined ? "Nill" : element.B.replace(/\s+/g,'-');
//         var phonenumber = element.C === undefined ? "Nill" : element.C
//         var house_color = element.D === undefined ? "Nill" : element.D.replace(/\s+/g,'-');
//         var home_address = element.E === undefined ? "Nill" : element.E.replace(/\s+/g,'-');
//         var gender = element.F === undefined ? "Nill" : element.F.replace(/\s+/g,'-');
//         var age = element.G ;

        
//         var filename = firstname + "-" + lastname + "-" + phonenumber;
//         console.log("HOME ADDRESS", home_address);
//         guestEncodedURL = `${staticURL}/guest/qrcode/authenticate/stage/?firstname=${firstname}&lastname=${lastname}&phonenumber=${phonenumber}`;
//         console.log(guestEncodedURL);
//         var guestHashed = hasher(guestEncodedURL);
//         client.query("INSERT INTO RegisteredGuest(id,hashcode,datecreated,last_checked_in ,last_checked_out,checked_in,firstname,lastname,phonenumber,house_color,home_address,gender,age) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) ON CONFLICT (hashcode) DO NOTHING", [uuid_generator(), guestHashed, dateCreated, null, null, !1, firstname, lastname, phonenumber, house_color, home_address, gender, age], function(error, fields) {
//             if (error) {
//                 console.log("Guest already created and it exist", error);
//                 emitter.emit("Error occured while creating the user")
//             }
//         });
//         writeImageQrCode(guestEncodedURL, filename, imageQrCodeDir);
//         emitter.emit('success', filename + " successfully created")
//     });
// }



/**
 * 
 * @param {*} guests 
 * @param {*} imageQrCodeDir 
 * @param {*} response 
 */
function addNewGuest(guests ,imageQrCodeDir,response) {

    var dateCreated = "" ;
    folderCheck();

    fs.mkdir(imageQrCodeDir , 0755, function (err) {
        if (err) {} 
      });

    var counter = 0;
    guests.forEach(element => {
        dateCreated = new Date();

        var firstname = element.firstname === undefined ? "Nill" : element.firstname.replace(/\s+/g,'-');
        var lastname = element.lastname ===  undefined ? "Nill": element.lastname.replace(/\s+/g,'-');
        var phonenumber = element.phonenumber === undefined ? "Nill" :element.phonenumber ;
        var house_color = element.house_color === undefined ? "Nill":element.houseColor.replace(/\s+/g,'-');
        var home_address = element.home_address === undefined ? "Nill":element.home_address.replace(/\s+/g,'-');
        var gender = element.gender === undefined ? "Nill":element.gender.replace(/\s+/g,'-');
        var age = element.age ===undefined ? null:element.age;
        var filename = firstname + "-" + lastname + "-" + phonenumber;


        console.log("HOME ADDRESS", home_address);
        guestEncodedURL = `${staticURL}/guest/qrcode/authenticate/stage/?firstname=${firstname}&lastname=${lastname}&phonenumber=${phonenumber}`;



        var guestHashed = hasher(guestEncodedURL);

        client.query("INSERT INTO registeredguest(id,hashcode,datecreated,last_checked_in ,last_checked_out,checked_in,firstname,lastname,phonenumber,house_color,home_address,gender,age) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) ON CONFLICT (hashcode) DO NOTHING", [uuid_generator(), guestHashed, dateCreated, null, null, !1, firstname, lastname, phonenumber, house_color, home_address, gender, age], function(error, fields) {
            if (error) {
                console.log("Guest already created and it exist",error);
                emitter.emit("Error occured while creating the user")
                fs.appendFile("server.app.log","----------------------------------"+new Date().toString()+"-----------------------------------------\n",()=>{})
                fs.appendFile("server.app.log",error,()=>{}) ;
            }else{
                emitter.emit('success', filename + " successfully created");
            }
        });
    });

    console.log("guest array is exhausted...",counter);

    // emitter.on("guest-excel-write-complete",()=>{

        var counter = 0 ;

        guests.forEach(element=>{

        ++counter ;

        var firstname = element.firstname === undefined ? "Nill" : element.firstname.replace(/\s+/g,'-');
        var lastname = element.lastname ===undefined ? "Nill": element.lastname.replace(/\s+/g,'-');
        var phonenumber = element.phonenumber ===undefined ? "Nill":element.phonenumber;
        var filename = firstname + "-" + lastname + "-" + phonenumber;

        guestEncodedURL = `${staticURL}/guest/qrcode/authenticate/stage/?firstname=${firstname}&lastname=${lastname}&phonenumber=${phonenumber}`;

        writeImageQrCode(guestEncodedURL, filename, imageQrCodeDir);
        emitter.emit('success', filename + " successfully created\n");

            if(counter === guests.length ){
                    emitter.emit("excel-date-created", dateCreated);
                    console.log("excel date Created" , dateCreated)
                    emitter.emit("guest-excel-write-complete");
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
 * starts the server created usung the express app
 */
httpServer.listen(4040, () => {
    console.log("[+] The server is running on ADDRESS : ", "localhost", " and on a PORT :", "4040")
})