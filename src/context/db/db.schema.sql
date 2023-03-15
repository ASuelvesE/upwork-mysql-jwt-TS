

CREATE DATABASE `examenfinal`;


create table usuarios (
	alias varchar(40),
	email varchar(40),
	contrasena varchar(400),
	primary key(email)
);

create table categorias (
	id int unsigned auto_increment primary key,
	descripcion varchar(40)
);

create table servicios (
	id int unsigned auto_increment primary key,
	email_usuario varchar(40),
	id_categoria int unsigned,
	provincia varchar(40),
	fechaFinalizacion datetime,
	descripcion varchar(300),
	titulo varchar(80),
	foreign key(email_usuario) references usuarios(email),
	foreign key(id_categoria) references categorias(id)
);

create table suscripciones (
	email_usuario varchar(40),
	id_categoria int unsigned,
	foreign key(email_usuario) references usuarios(email),
	foreign key(id_categoria) references categorias(id),
	primary key(email_usuario,id_categoria)
);

create table interesados (
	email_usuario varchar(40),
	id_servicio int unsigned,
	foreign key(email_usuario) references usuarios(email),
	foreign key(id_servicio) references servicios(id),
	primary key(email_usuario,id_servicio)
);
