# FitSchedule Backend


## Setup 

In order to fully use the application, the database needs to be populated with courses. There are two ways to achieve this:

1)Run the frontend application and register a user by selecting the "Course Provider" checkbox and create courses there. After this the newly created courses can be searched from the discover page of the application.

2) Directly send courses to the database from an application like Postman. Use "localhost:3000/courses/createcourseasfitnesscenter" and send an HTTP post. The body should contain a JSON with the following format:

```
{
	"name": "Course Name",
	"instructor": "Instructor Name",
	"lat": "Latitude of the coordinates of the location of the course",
	"lng": "Longitude of the coordinates of the location of the course",
	"timeslot": [
            {"start":"A JavaScript Date Object", "end":"A JavaScript Date Object", "day": A number between 0-6, indicating the weekday of the course},
            {"start":"A JavaScript Date Object", "end":"A JavaScript Date Object", "day": A number between 0-6, indicating the weekday of the course}
        ],
	"fitnesscentername": "The name of the fitness center that this course is being provided from"
}
```

A sample JSON is as follows:

```
{
	"name": "FitSchedule Course",
	"instructor": "FitSchedule Instructor",
	"lat": "48.119666",
	"lng": "11.491177",
	"timeslot": [
            {"start":"2018-07-04T09:00:00.000Z", "end":"2018-07-04T11:00:00.000Z", "day": 1},
            {"start":"2018-07-04T14:00:00.000Z", "end":"2018-07-04T16:00:00.000Z", "day": 2}
        ],
	"fitnesscentername": "FitSchedule Fitness Center"
}
```
The date objects of the timeslot is only used for hours; the day value is not important, it automatically adapts to the "day" entry of the timeslot. E.g. if you give a date that corresponds to a Wednesday, but give the "day" value as 5 the day of the course will be set to Saturday(Monday: 0, Tuesday: 1...)

