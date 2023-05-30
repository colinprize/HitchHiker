## May 15-18, 2023

This week, I worked on:

* Getting user endpoints ready to go and completed

I made sure that the endpoints required for front end 
functionality was ready to go that included Create_user, 
update_user, get_all_users, get_one_user, delete_user. 
getting them all to work wasn't too difficult, I mainly 
used the time to practice and understand how my endpoints 
were created and how they interacted with my database. 

It was a tough week, somethings clicked more but overall,
I felt pretty confident in my understanding on how Fast 
API is working. Some minor confusion in the update user 
but at the end of the day it was just a missplaced comma.
By the end of the week all user endpoints were completed 
and errors were solved.


## May 22, 2023

Today, I worked on:

* Back-end user Authentication 


Today, I was stuck on validating the user authentication
and creating a conditional argument that only allowed
a signed in user to change their own information. Once 
I worked through that the rest of auth was pretty simple.
Most of the day was spent on user auth and debugging errors.
I got to know when to call it and ask for help, more 
progress will be made if I reach out for help.

## May 23-24, 2023

* Complete User auth and hike endpoints auth

These two days were completely dedicated to adding 
authentication to my remaining endpoints in the users.py, 
fairly straight forward. All of the 24th was spent taking
Colins hike endpoints and adding authentication to them
essentially the same thing for users, making sure the 
person who created the hike was the only one allowed to 
change thedetails

We also were able to autofill certain fields that don't 
need to be changes when updating the information. An 
example of this would be the organizer_id in the hike 
details that information will never change so we 
hard-coded the matching user ID of the person signed in
when creating the hike initially and when updating. 
Additionally, only the person who created the hike can 
remove that hike instance from the database.  

