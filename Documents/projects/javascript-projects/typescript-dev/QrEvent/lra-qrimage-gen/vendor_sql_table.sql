DROP TABLE IF EXISTS cedarqrimageggen_db ;


CREATE TABLE IF NOT EXISTS vendors(
    id varchar(36) not null UNIQUE PRIMARY KEY,
    hashcode varchar(40) UNIQUE , 
    datecreated timestamp NULL, 
    last_checked_in TIMESTAMP NULL,
    last_checked_out TIMESTAMP NULL, 
    checked_in boolean ,
    phonenumber varchar(200) NULL, 
    standnumber varchar(250) NULL,
    gender VARCHAR(6)
);