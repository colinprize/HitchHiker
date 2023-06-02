## June 1, 2023

Today I worked on:

* Completed MVP of CreateRideForm.js

I incorporated the jwtdown-for-react `useToken` hook to get the user token and add it to the headers of any fetch request to our API.  I completed the CreateRideForm.js component.  There are some changes I will want to make depending on the overall architecture of our front-end application.  Specifically this includes removing the hike_id form field.  That value should instead be passed either as a Route param or a prop if the Rides components all become children of Hikes.  I had to manipulate the datetime value for the hike object associated with a given id to create a value for the meetup time of a given ride.  This is very convoluted code.  I will either change the datatype in the SQL table to just time or get the needed year, month, and day values as props from whichever Hike component calls anything related to Rides.

## May 31, 2023

Today I worked on:

* Styling the CreateRideForm component.
* Installation of the tailwindcss/forms plugin

It became apparent that unlike Bootstrap, Tailwind CSS does not have out-of-the-box form input styling classes.  In our ghi Docker container, I ran `npm install -D @tailwindcss/forms` and added the form plugin to the plugins section of our tailwind.config.js file.  I utilized some styling classes from the Tailwind UI form for my form that creates a new ride instance.

## May 30, 2023

Today I worked on:

* Tailwinds CSS documentation
* Start of form component

I went through the Tailwinds CSS documentation.  I read through the Getting Started Section and the Core Concepts section.

## May 26, 2023

Today I worked on:

* Added authenticator account data to all ride router and query functions
* Overrode token expiration time in authenticator.py

I noticed that when testing our API endpoints, the user would get logged out and it was not immediately obvious until there was an error response where there shouldn't be.  I found in the JWTdown for FastAPI documentation that the default expiration can be changed by passing a timedelta object as the value for the `exp` parameter in the authenticator instantiation..

I passed the value for the `user_id` property of `authenticator.get_current_account_data` to each RideRepository method where the Pydantic model had a field for an associated user.  I tested each of the ride API endpoints a submitted a merge request to our main branch on GitLab.


## May 30, 2023

Today I worked on:

* Tailwinds CSS documentation
* Start of form component

## May 26, 2023

Today I worked on:

* Added authenticator account data to all ride router and query functions
* Overrode token expiration time in authenticator.py

I noticed that when testing our API endpoints, the user would get logged out and it was not immediately obvious until there was an error response where there shouldn't be.  I found in the JWTdown for FastAPI documentation that the default expiration can be changed by passing a timedelta object as the value for the `exp` parameter in the authenticator instantiation..

I passed the value for the `user_id` property of `authenticator.get_current_account_data` to each RideRepository method where the Pydantic model had a field for an associated user.  I tested each of the ride API endpoints a submitted a merge request to our main branch on GitLab.


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
