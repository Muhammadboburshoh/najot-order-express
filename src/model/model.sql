create databse ordersapp;

create table courses (
  id serial not null primary key,
  name varchar(100) not null
);

create table orders (
  order_id serial not null primary key,
  fullname varchar(40) not null,
  tel varchar(16) not null,
  age int2 not null,
  course_id int not null references courses(id)
);

insert into orders(fullname, tel, age, course_id) values ('Abdulloh', '125', 15, 2);

insert into courses(name) values ('Go'), ('NodeJs');

create table users(
  user_id serial not null primary key,
  username varchar(30) not null,
  password varchar(60) not null
);

create extension "pgcrypto"; -- passwordni shifirlab saqlash uchun

insert into users(username, password) values
('muhammad', crypt('1234', gen_salt('bf')));

select user_id, username from users where username = 'muhammad' and password = crypt('1234', password);
