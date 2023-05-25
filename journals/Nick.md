## May 23, 2023

Today I worked on:

* Writing endpoints for the Ride model

Our group struggled with figuring out how to create endpoints for dependent resources.  Specifically this included instances of the Ride object, each of which has a foreign key relationship with instances of the Hike object.  We received help on this issue.  The solution we were shown was to run an database execute method that included a SELECT statement which validates that our driver_id in our INSERT statement was the same as the user_id for the hike instance called by the path argument.

## May 22, 2023

Today I worked on:

* Learning about React Redux and Redux Toolkit from the daily lecture.
* Almost functioning API endpoints for the Rides tables.

Our group reconvened to start the week and established our weekly goals of completing our back-end and authentication.  We have some of our endpoints working for top-level resources (users).  I am currently working on the Rides endpoints which are dependent on each hike instance.  Making sure that the unique id for each hike is registered in the API routers is what I am currently working on.

## May 18, 2023

Today, I worked on:

* Organizing our current GitLab issues by creating labels for each feature number and applying them to each feature and story.
* Made PostgreSQL CREATE TABLE statements for the ride and ride_users tables.

Our group focused more heavily on organizing our tasks today.  Creating labels for each feature and applying them to each issue made it easier to visualize how our work is broken down.

I continue to learn about SQL queries.  I am working to maintain relational integrity with proper use of foreign keys.
