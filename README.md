<p align="center">
  <img width="230" height="230" src="client/public/logo2.png">
</p>

![GitHub language count](https://img.shields.io/github/languages/count/DavidHuerta11/happy-camping?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/DavidHuerta11/happy-camping?color=yellow&logo=javascript&style=flat-square)

# Happy Camping

A React application which helps outdoor enthusiasts go camping. 
It provides weather data as well as campground locations for the user.

<img width="500" height="500" src="client/src/img/Happy_Camping_Gif.gif">

## Instructions

1. Enter the desired country (abbreviation or fullname)
2. If the United States is selected then enter the desired city
3. Enter the desired city
4. If the United States or Canada are selected the campgrounds section will appear; enter number of campgrounds you wish to view
5. Select campground link and view the campground

***Note: Currently the countries which have the most available cities for display are the following:***
- United States
- Mexico
- Canada
- Germany
- France
- Italy
- Spain

## Demo

[Happy Camping](https://happy-camping.herokuapp.com/)

## Technologies Used

PERN stack: PostgreSQL, Express, React, Node.js

## External APIs Used

[Open Weather API](https://openweathermap.org/api)

[Campgrounds Search API](https://developer.active.com/docs/read/Campground_Search_API)

## Problems faced
 
The main problem faced was with the JSON data provided by the Open Weather API. Some of the JSON data was not valid which caused errors within the database. The file was also too large which caused PostgreSQL out of memory errors.



