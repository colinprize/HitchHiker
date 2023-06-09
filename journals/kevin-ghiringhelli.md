In the journals, every day that you work on the project, you must make an entry in your journal after you've finished that day. At a minimum, you will need to include the following information:

The date of the entry
A list of features/issues that you worked on and who you worked with, if applicable
A reflection on any design conversations that you had
At least one ah-ha! moment that you had during your coding, however small

Keep your journal in reverse chronological order. Always put new entries at the top.
## 6/7
I wrote a unit test to test the create and emergency contact feature.

## 6/6
I finished the header and also created a second header for logged out users, and implemented the logic so that if a user isn't logged in they see a different header than users that are logged in

## 6/5
I implemented the ability for a user to leave a hike they're signed up for.  I also started working on a header for our page
## 6/2 + weekend
I created list views for all hikes and also just the hikes a user is signed up for.  I also created a detail view where hikers can see the details of all the hikes

## 6/1
Altered the modal I made so that it can both create an emergency contact, or edit one if you already have the database.  I used a bunch of ternary operators to do this, which was fun because I remember when I first started learning coding I was teaching myself JS and ternary operators were the first thing where I thought to myself "wow, this is really cool".  But in this class we hadn't used them much

## 5/31
Successfully connected to modal to send data to the database.  Aha moment was when I realized I had to use the Authorization: Bearer token header to give my user authorization.  Took a while to figure that out but once I added that one line of code it worked instantly

## 5/30
Began working on some front end components.  Was able to create a modal for users to enter their emergency contact information.  Still working on implementing the ability to submit data to the database

## 5/26
Implemented the ability for users to get a list of only hikes that they've signed up for.  Aha moment was struggling with the SQL statement before realizing it was the perfect opportunity for an outer join

## 5/25
Finally finished emergency contact features.   Had to create a new function to return a specific emergency contact, and then pass along the user_id from that contact and check if it matches the user id of the logged in user.  It took a while but once it finally worked was my "aha moment"

Also began working on implementing the ability for a user to get a list of every hike they've signed up for

## 5/24
Continued working on Emergency Contact endpoints.  Got 98% of the way done, just need to properly protect the edit emergency contact feature so that users can only edit their own

## 5/23
Pair programmed with Jonathan and helped him figure out an issue we were seeing with the "update user" function in backend auth.  Also started on Emergency Contact endpoint

Aha moment- figuring out how to pass the hashed password through to our update user function

## 5/22
Pair programmed with Jonathan and made good progress on backend Auth

## 5/20
Managed to complete delete user and get one user functions that Jonathan and I struggled with during the week

## 5/18
We finished building our tables and finished delgating tasks, and got all of our issues upload to gitlab


## 5/17
We got our database connected and continued building our tables
Began working on user endpoints with Jonathan

Aha moment- was really cool to see the database get connected and see data get posted to our database

## 5/16
We built our docker compose file, and began to break our project into tasks and discuss how things would be delegated
Jonathan and I began building a table

## 5/15
As a group, we finished deciding how our tables should look and decided on a db to use (postgres)
