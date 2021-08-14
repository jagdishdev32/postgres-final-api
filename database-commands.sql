CREATE DATABASE api_database;

--\c into api_database

create table users (
	user_id INT NOT NULL, 
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(50) NOT NULL,
	phone_number VARCHAR(15) NOT NULL,
	PRIMARY KEY(user_id)
);

insert into users (user_id, name, email, password, phone_number) values (1, 'Clemmie Sakins', 'csakins0@blinklist.com', 'PoVItXy2Cz', '6393380711');
insert into users (user_id, name, email, password, phone_number) values (2, 'Karyl Poker', 'kpoker1@topsy.com', '1FRFuX', '8021211336');
insert into users (user_id, name, email, password, phone_number) values (3, 'Freddy Falkinder', 'ffalkinder2@aboutads.info', 'cVg0zg', '3412062312');
insert into users (user_id, name, email, password, phone_number) values (4, 'Glenn Addy', 'gaddy3@addtoany.com', 'Cc4GYszR', '8344086144');
insert into users (user_id, name, email, password, phone_number) values (5, 'Jenica Drohane', 'jdrohane4@state.tx.us', 'yahu6L', '7316114318');
insert into users (user_id, name, email, password, phone_number) values (6, 'Merill Reddihough', 'mreddihough5@un.org', 'd4RdHF', '8421628202');
insert into users (user_id, name, email, password, phone_number) values (7, 'Sorcha Soares', 'ssoares6@mapy.cz', 'T7RPizr', '8384894883');
insert into users (user_id, name, email, password, phone_number) values (8, 'Doria Sheeres', 'dsheeres7@paypal.com', '1gcm3TXpp', '8831786181');
insert into users (user_id, name, email, password, phone_number) values (9, 'Mariana Waslin', 'mwaslin8@paypal.com', 'GwkXyScF', '3306452813');
insert into users (user_id, name, email, password, phone_number) values (10, 'Harman Dohr', 'hdohr9@woothemes.com', 'Swk1y1s', '6957050985');
insert into users (user_id, name, email, password, phone_number) values (11, 'Arel Lees', 'aleesa@instagram.com', 'cZxoOLmwZ', '5691655788');
insert into users (user_id, name, email, password, phone_number) values (12, 'Egon Grigorio', 'egrigoriob@phpbb.com', 'lXCa0SDZF9', '6597065591');
insert into users (user_id, name, email, password, phone_number) values (13, 'Mellie Portinari', 'mportinaric@google.nl', '2YX2NzQAoflh', '5406584566');
insert into users (user_id, name, email, password, phone_number) values (14, 'Mariya Kopje', 'mkopjed@amazon.com', 'KH1c4IQOWc', '7889175933');
insert into users (user_id, name, email, password, phone_number) values (15, 'Joy Tribbeck', 'jtribbecke@umich.edu', 'hWGtUOs6JeTc', '2461187081');
insert into users (user_id, name, email, password, phone_number) values (16, 'Franny Parrott', 'fparrottf@miibeian.gov.cn', 'mDqVyFwi82', '9303728514');
insert into users (user_id, name, email, password, phone_number) values (17, 'Wendall Jaqueminet', 'wjaqueminetg@jigsy.com', 'rmMKEoGXfVb1', '4259351116');
insert into users (user_id, name, email, password, phone_number) values (18, 'Garth Golborne', 'ggolborneh@odnoklassniki.ru', '7LbvSpn', '8449549850');
insert into users (user_id, name, email, password, phone_number) values (19, 'Blythe Gilffilland', 'bgilffillandi@un.org', 'u0WOeTNuJ', '1784342867');
insert into users (user_id, name, email, password, phone_number) values (20, 'Freddy Kinnear', 'fkinnearj@latimes.com', 'UuCgQUzwN4D', '9087888556');



-- Post Req data
-- {
--     "user_id": "20",
--     "name": "Freddy Kinnear",
--     "email": "fkinnearj@latimes.com",
--     "password": "UuCgQUzwN4D",
--     "phone_number": "9087888556"
--   }