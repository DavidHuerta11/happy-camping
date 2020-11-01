-- CREATE DATABASE happycamping;
-- RUN THIS SCRIPT FIRST

CREATE TABLE locations(
    location_id INTEGER PRIMARY KEY,
    city VARCHAR(100),
    state_abbreviation VARCHAR(100),
    state_name VARCHAR(100),
    country_abbreviation VARCHAR(100),
    country_name VARCHAR(100)
);

CREATE OR REPLACE
  FUNCTION replace_json_keys(IN js TEXT) 
  RETURNS json 
  STABLE 
  AS
$$
BEGIN
  js := replace(js, '"id"', '"location_id"');
  js := replace(js, '"name"', '"city"');
  js := replace(js, '"state"', '"state_abbreviation"');
  js := replace(js, '"country"', '"country_abbreviation"');
  return js::json;
END;
$$ LANGUAGE 'plpgsql';


