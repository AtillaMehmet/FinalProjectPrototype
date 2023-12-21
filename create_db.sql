CREATE DATABASE finalprototype;
USE finalprototype;
CREATE TABLE groupfinder (id INT AUTO_INCREMENT,name VARCHAR(50),description VARCHAR(250),requirements VARCHAR(250),lookingfor VARCHAR(250), timeframe INT unsigned, startdate INT unsigned,PRIMARY KEY(id))
INSERT INTO groupfinder (name, description, requirements,lookingfor,timeframe, startdate)VALUES('Atilla', 'I am doing a final project that involves sql html css python and various other languages', 'The requirements for this website are that it should be functional for general use in 4 months ','I am looking for someone who has expertise in ai development and linking that to an sql database.' ,16,2 );
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwerty';
GRANT ALL PRIVILEGES ON leagueinfo.* TO 'appuser'@'localhost';