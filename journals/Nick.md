## May 25, 2023

Today I worked on:

* Completing create and delete endpoints for each rider instance of a given ride

I had to make some changes to my create_rider function which allows a user to join a ride for a given hike.  My Pydantic models were not working the way they should, but I made some changes to the db.execute methods and the RiderOut call so now it is working.  I wrote an unjoin_ride function for the RideRepository which deletes a given instance of the rider object when a user no longer going on the ride.


## May 24, 2023

Today I worked on:

* Updating foreign key constraints of junction table CREATE statements
* Additional Ride endpoints

I realized before getting started on CREATE and DELETE endpoints that we would want to make sure that instances of ride or hike participants are removed when the respective ride or hike is deleted.  I accomplished this by adding the ON DELETE CASCADE constraint to the foreign key columns in hikes_users and ride_user tables which reference the unique id integer field of the parent event.  Testing this meant deleting and re-creating the volume a few times.  I also tried doing the same thing for the user_id foreign key property so that the participant instance is deleted when a user is.  This naturally caused all other participant instances to be deleted for any event that shared the same hike or ride id.  I removed this ON DELETE CASCADE constraint for the user field.  We currently do not have the need to delete user instances, but if we choose to implement that then it may be possible to include separate DELETE statements for any participant instances where the user id matches.

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
## May 18, 2023

Today, I worked on:

* Organizing our current GitLab issues by creating labels for each feature number and applying them to each feature and story.
* Made PostgreSQL CREATE TABLE statements for the ride and ride_users tables.

Our group focused more heavily on organizing our tasks today.  Creating labels for each feature and applying them to each issue made it easier to visualize how our work is broken down.

I continue to learn about SQL queries.  I
