CREATE SEQUENCE hibernate_sequence START 10;

CREATE TABLE hipster_user
(
    id   INT,
    email VARCHAR(20),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    login VARCHAR(100),
    password VARCHAR(255)
);
INSERT INTO hipster_user(id, email, first_name, last_name, login, password)
VALUES (1, 'sja@devoxx.com', 'Stephan', 'Janssen', 'admin', 'admin');

CREATE TABLE hipster_event
(
    id   INT,
    name VARCHAR(100),
    description VARCHAR(255)
);
INSERT INTO hipster_event(id, name, description)
VALUES (1, 'Devoxx Belgium 2019', 'The developers conference from developers for developers'),
       (2, 'Devoxx UK 2019', 'The developers conference in London');
