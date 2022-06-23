create table book 
(
bookid integer primary key,
bookname varchar(15),
price integer
);

desc book;
insert into book(bookid,bookname,price) values
 (1,"java",300),
 (2,"ADS",400),
 (3,"WPT",500);
 
 
 select * from book;