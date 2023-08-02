create database user;


create table user_table
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(20) NOT NULL,
    email varchar(20) NOT NULL,
    password varchar(20) NOT NULL,
    role varchar(10) NOT NULL,
    PRIMARY KEY(id)
);


desc user_table;  // description of table of database

