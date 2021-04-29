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