DROP TABLE IF EXISTS RegisteredGuest ;
CREATE TABLE RegisteredGuest (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    hashcode VARCHAR(40) NOT NULL UNIQUE,
    datecreated TIMESTAMP , 
    last_checked_in TIMESTAMP ,
    last_checked_out TIMESTAMP,
    checked_in BOOLEAN,
    firstname VARCHAR(250) ,
    lastname VARCHAR(250),
    phonenumber VARCHAR(13),
    gender VARCHAR(9),
    house_color VARCHAR(10),
    home_address VARCHAR(25000),
    age INT
);


DECLARE firstname VARCHAR(250) , lastname varchar(300) , middlename varchar(300),
agecount = 0 ;

BEGIN
	WHILE agecount > 100 :
		SELECT age FROM ageregistered WHERE age < 10
		UNION ALL SELECT countryage where country is like nig* ;
		CASE num 
		
		WHEN num > 10
			THEN INSERT INTO countryage() values() ;
		WHEN num < 10
			THEN INSERT INTO countryage values()
