CREATE DATABASE api_database;

-- \c api_database

CREATE TABLE users (
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

-- Employee schema

CREATE TABLE employees (
	employee_id INT NOT NULL, 
	name VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	PRIMARY KEY(employee_id)
);

insert into employees (employee_id, name, password) values (1, 'Nick Habbema', 'L4xJFhRrNR');
insert into employees (employee_id, name, password) values (2, 'Maddie Leacock', '6GC1zpLKf');
insert into employees (employee_id, name, password) values (3, 'Brooke Philipsohn', '0Q9fOTZjE');
insert into employees (employee_id, name, password) values (4, 'Zebadiah Crimes', 'gZG0Rbxlq');
insert into employees (employee_id, name, password) values (5, 'Brenn Laughtisse', 'W15yGYdZEv7');

-- Insurance Schema

CREATE TABLE insurance (
	insurance_id SERIAL NOT NULL,
	user_id INT NOT NULL,
	insurance_type VARCHAR(50) NOT NULL,
	issue_date DATE,
	end_date DATE,
	application_date DATE DEFAULT NOW(),
	PRIMARY KEY(insurance_id),
	CONSTRAINT insurance_id FOREIGN KEY(user_id) REFERENCES users(user_id),
	CHECK (insurance_type = 'covid_insurance' OR insurance_type = 'health_insurance' OR insurance_type = 'gold_insurance')
);

insert into insurance (insurance_id, user_id, insurance_type, application_date) values (1, 8, 'covid_insurance', '5/9/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (2, 6, 'health_insurance', '3/13/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (3, 10, 'health_insurance', '8/11/2020');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (4, 2, 'covid_insurance', '4/4/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (5, 8, 'covid_insurance', '7/6/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (6, 10, 'health_insurance', '7/21/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (7, 6, 'health_insurance', '11/30/2020');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (8, 1, 'covid_insurance', '8/23/2020');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (9, 7, 'gold_insurance', '3/21/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (10, 9, 'gold_insurance', '4/3/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (11, 5, 'covid_insurance', '3/7/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (12, 10, 'health_insurance', '3/5/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (13, 3, 'health_insurance', '11/24/2020');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (14, 3, 'gold_insurance', '7/24/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (15, 6, 'gold_insurance', '6/21/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (16, 6, 'gold_insurance', '8/27/2020');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (17, 9, 'health_insurance', '4/24/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (18, 5, 'covid_insurance', '5/1/2021');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (19, 2, 'covid_insurance', '8/15/2020');
insert into insurance (insurance_id, user_id, insurance_type, application_date) values (20, 3, 'covid_insurance', '2/9/2021');

-- Tickets schema

CREATE TABLE tickets (
	ticket_id INT NOT NULL,
	insurance_id INT NOT NULL,
	status TINYINT DEFAULT 0,
	comments text,
	-- Relation with employees with what ?
	CONSTRAINT insurance_id FOREIGN KEY(insurance_id) REFERENCES insurance(insurance_id)
);

-- Ticket post generate
-- [{
--   "ticket_id": 1,
--   "insurance_id": 4,
--   "status": 0,
--   "comments": ""
-- }, {
--   "ticket_id": 2,
--   "insurance_id": 5,
--   "status": 0,
--   "comments": ""
-- }, {
--   "ticket_id": 3,
--   "insurance_id": 3,
--   "status": 0,
--   "comments": ""
-- }, {
--   "ticket_id": 4,
--   "insurance_id": 5,
--   "status": 0,
--   "comments": ""
-- }, {
--   "ticket_id": 5,
--   "insurance_id": 3,
--   "status": 0,
--   "comments": ""
-- }]

-- Insurance Type Schema

CREATE TABLE covid_insurance (
	insurance_id INT NOT NULL,
	nominee_info VARCHAR(200),
	policy_number VARCHAR(100),
	CONSTRAINT insurance_id FOREIGN KEY(insurance_id) REFERENCES insurance(insurance_id)
);

CREATE TABLE health_insurance (
	insurance_id INT NOT NULL,
	nominee_info VARCHAR(200),
	health_insurance_type VARCHAR(200),
	policy_number VARCHAR(100),
	CONSTRAINT insurance_id FOREIGN KEY(insurance_id) REFERENCES insurance(insurance_id)
);


CREATE TABLE gold_insurance (
	insurance_id INT NOT NULL,
	gst_details TEXT NOT NULL,
	policy_number VARCHAR(100),
	CONSTRAINT insurance_id FOREIGN KEY(insurance_id) REFERENCES insurance(insurance_id)
);
