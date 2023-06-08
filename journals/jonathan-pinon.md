## May 15-18, 2023

This week, I worked on:

* Getting user endpoints ready to go and completed

I made sure that the endpoints required for front end 
functionality was ready to go that included Create_user, 
update_user, get_all_users, get_one_user, delete_user. 
getting them all to work wasn't too difficult, I mainly 
used the time to practice and understand how my endpoints 
were created and how they interacted with my database. 


It was a tough week, some things clicked more but overall
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

We also were able to autofill certain fields that don't 
need to be changes when updating the information. An 
example of this would be the organizer_id in the hike 
details that information will never change so we 
hard-coded the matching user ID of the person signed in
when creating the hike initially and when updating. 
Additionally, only the person who created the hike can 
remove that hike instance from the database.  

## May 23-24, 2023

* Complete User auth and hike endpoints auth
Today, I was stuck on validating the user authentication
and creating a conditional argument that only allowed
a signed in user to change their own information. Once 
I worked through that the rest of auth was pretty simple.
Most of the day was spent on user auth and debugging errors.
I got to know when to call it and ask for help, more 
progress will be made if I reach out for help.

These two days were completely dedicated to adding 
authentication to my remaining endpoints in the users.py, 
fairly straight forward. All of the 24th was spent taking
Colins hike endpoints and adding authentication to them
essentially the same thing for users, making sure the 
person who created the hike was the only one allowed to 
change thedetails

## May 25-26

* Added Tailwind to ghi/ reviewed frontend auth still trying to get it to work


I spent the 25th reviewing and adding tailwind to our 
project. I was coming across a number of errors because 
I decided to follow a tutorial off of youtube that 
mightve been out of date. Either way, I went back through 
the tailwind documentation and was able to get it working. 
I am not going to start using tailwind until I have my 
authentication up and running. I'm finding it quite 
difficult to tackle on my own but will reach out to the 
team/seirs if I really get stuck on something.

All of friday was spent watching videos on auth, 
reviewing and rewatching lectures. I will be the one 
doing auth for the front end so I made sure to get a grasp 
on as much as I can hopefully by tuesday I can have
everything dont and out of the way so I can create
my forms and start styling the webpages.

## May 30
Worked on styling the login and signup pages. Also worked 
on background and reading up on how css pages will react 
with tailwind classes. Managed to create a custom footer 
spent most of the day just making things look nicer. I was
having difficulty with buttons overlapping with the footer
when zooming in to a certain point and couldn't get it to 
work, eventually gave up and continued styling. Overall the 
day was spent getting a better understanding of how to work 
with the css and making the endpoints unreachable from 
people who werent logged in.

## May 31
Today was spent finalizing auth for hikes and rides because 
there were discrepancies. All auth endpoints are completely 
protected on the backend, started looking into deployment. 
Volunteered to take it over, handled a merge request from 
kevin and continued to debug issues with my front end. I 
wanted to auto fill some information that wouldn't be
displayed on the front end, decided to move on once I 
realized it wouldjust be a stretch goal of mine. Once I was 
able to get all my forms completely working and I was able 
to navigate between them I moved on to the update user form 
as my second to last componen. I will finish update user 
today and move on to deployment tomorrow.

## June 1-2
Getting started on deployment and was able to finish update 
user, since update user is all set I am able to change the 
user information. My main concern is that I have to enter in 
password before I move on to editing user information which 
I would like to remove to avoid the user having to enter in 
their password whenever changing their user information.
Perhaps I can make it so that they have to enter it in order 
to change their information, like a verification thing? 
Anyway, started the deployment, was running into a ton of 
issues but luckily help me understand was able to clear up
almost every issue I came across. Finished the day with 
not being able to see my database container in our 
container repository, but everything else went somewhat 
smoothly.

## June 5
The major issue with my deployment of the database container
was that my team wasnt verified, myself included. So first
thing I did was make sure everyone was all set to go, once I
was able to verify everyone the pipline/jobs started showing
up but still no container in the registry so I am working 
through the flake8 issues that are currently blocking me 
from moving forward with that. I really want to get 
deployment done today so I can focus on my final component. 

## June 6
Major blocker with deployment and honestly spent too much time 
stressing about seeing the fatsapi page after deployment. We 
had the backend deployed but were getting the white page of 
death, after triple checking that it wasnt an error with how
I deployed and having Rosheen confirm that I should move on 
I was able to get the front end deployed, and no white page
for the deployed frontend. Finished the day starting the unit
test and will plan on getting it done tomorrow so that I can 
add the final unit test section to the ci.yml. I think 
tomorrows goals will be to finish header, get unit test
deployed, and finalize everything I was responsible for in the
back and frontend. 

## June 7
Worked on unit test and was able to get that working and merged
properly. At first I wanted to create a unit test for creating 
a user but that was troublesome because it involved hashed
password and also a token so I was having trouble mimicing that 
process in the unit test and settled with a get_all users unit
test. After that I moved on to a seperate issue with our logout 
button. We were using the logout feature that came with the 
galvanize jwt-down-for-react and it simply just wouldnt work at 
all and after several hours we realized what the issue was. 
My header that contained the logout button was set outside of 
the AuthProvider tag which contained the necessary baseUrl that 
the logout feature needed in order to remove the token. once I
put the header in its proper place I was all set to go and felt
accomplished going into thursday.