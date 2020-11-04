-- CREATE DATABASE happycamping;
-- RUN THIS SCRIPT FIRST

CREATE TABLE countries(
    country_id SERIAL PRIMARY KEY,
    country_code VARCHAR(100),
    country_name VARCHAR(100)
);

CREATE TABLE states(
    state_id SERIAL PRIMARY KEY,
    country_id INT NOT NULL REFERENCES countries(country_id),
    state_code VARCHAR(100),
    state_name VARCHAR(100)
);


