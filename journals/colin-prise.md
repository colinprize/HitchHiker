##
journal jun 5
tested a merge request
merged some css tailwind styling.


##
journal jun 2
tested and approved several merges
wrote sign up for hikes function. that took way too long. learned a little more about React , but react and css are a mystery to me as far as rules go. Im glad that React is pretty decent at logging errors it makes things easy to track.


##
journal jun  1
i finished my form getting user_id/organizer_id in their was tripping me up, but that was just part of auth
i merged my file
time to start on the next adventure.

##
journal may 31
still working on my create a hike form
tailwind is tricky

##
journal may 30
discussed front end
designated tasks
I am working on Create a hike form.


##
journal may 26
explored some tailwind
test a few merge requests


##
journal may 25
I finished feature 6 post endpoint to sign up for a hike
I finished delete endpoint to unjoin a hike

The data was making its way to the database. I was getting a 500 error because i wasnt returning anything in my queries repo function and fastapi didnt like it.



##
journal may 24

i finished and merged feature 4 endpoint
i started working on feature 6 endpoints

we had good discussions on auth

i tested a merge request

##
journal may 23

i finished endpoints for feature 5
##
journal may 24

i finished and merged feature 4 endpoint
i started working on feature 6 endpoints

we had good discussions on auth


##
journal may 23

i finished endpoints for feature 5

PUT allowing us to edit hikes

GET hikes at id to get a single hike at hike_id
I started working on feature 4 endpoint


##
journal may 22
I finished my POST endpoint hikes

I finished DELETE endpoint for hikes

I finished UPDATE endpoint

I got more familiar with the FastAPI UI

I did my first merge


##
journal may 18
we finished the tables

I broke down the endpoints into user stories and added them to gitlab

we delegated tasks

I am working on POST create a hike and POST signup

time to learn fastAPI this weekend

##
journal may 17

we were able to get our database working.

we worked on tables.

##
journal tuesday may 16

we worked on setting up our Dockerfile for our project to get our database started so we can start adding tables.

we created the database and added pgadmin to our dockerfile so we can start adding tables.

we made an Asana, so we can manage our tasks better

we made a first merge.

##

Journal monday may 15

we worked on solidifying models
and we decided on using a postgres database
we met with Rosheen and got some good wireframe/endpoint feedback. we have done  our best to implement all the suggestions that we received.

Today, database transactions finally clicked. It
happened while we were trying to insert the
preferences for the customer. We had a bug in the
code, so the `User` record got created, but none
of the preferences. All of the inserts should
succeed or fail together. So, we used a transaction
to do that.
