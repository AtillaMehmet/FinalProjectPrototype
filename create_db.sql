CREATE DATABASE finalprototype;
USE finalprototype;
CREATE TABLE groupfinder (id INT AUTO_INCREMENT,name VARCHAR(50),description VARCHAR(250),requirements VARCHAR(250),lookingfor VARCHAR(250), timeframe INT unsigned, startdate INT unsigned,PRIMARY KEY(id));
INSERT INTO groupfinder (name, description, requirements,lookingfor,timeframe, startdate)VALUES('Atilla', 'I am doing a final project that involves sql html css python and various other languages', 'The requirements for this website are that it should be functional for general use in 4 months ','I am looking for someone who has expertise in ai development and linking that to an sql database.' ,16,2 );
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwerty';
GRANT ALL PRIVILEGES ON finalprototype.* TO 'appuser'@'localhost';
SELECT * FROM groupfinder;
DROP TABLE groupfinder;
CREATE TABLE groupfinder (id INT AUTO_INCREMENT,name VARCHAR(50),description VARCHAR(250),requirements VARCHAR(250),lookingfor VARCHAR(250), timeframe DATE, startdate DATE,PRIMARY KEY(id));
CREATE TABLE userinfo (username VARCHAR(50), firstname VARCHAR(50) NOT NULL, lastname VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, hashedPassword VARCHAR(255) NOT NULL, PRIMARY KEY (username));
SELECT * FROM userinfo
ALTER TABLE groupfinder ADD COLUMN group_size INT;
ALTER TABLE groupfinder MODIFY COLUMN startdate DATE;
ALTER TABLE groupfinder MODIFY COLUMN timeframe DATE;


-- Add the foreign key constraint to link the username column to the userinfo table
ALTER TABLE groupfinder
ADD column username varchar(50),
ADD CONSTRAINT fk_username
FOREIGN KEY (username)
REFERENCES userinfo(username)
ON DELETE CASCADE;

SELECT * FROM groupfinder;
