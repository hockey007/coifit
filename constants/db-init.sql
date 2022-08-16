create database coifit;
use coifit;

create table users(
    id int auto_increment primary key,
    email text not null,
    password text not null,
    createdAt datetime,
    updatedAt datetime
);

create table parlors(
    id int auto_increment primary key,
    mobile text not null,
    password text not null,
    createdAt datetime,
    updatedAt datetime
);