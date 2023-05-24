In the journals, every day that you work on the project, you must make an entry in your journal after you've finished that day. At a minimum, you will need to include the following information:

The date of the entry
A list of features/issues that you worked on and who you worked with, if applicable
A reflection on any design conversations that you had
At least one ah-ha! moment that you had during your coding, however small

Keep your journal in reverse chronological order. Always put new entries at the top.


## July 9, 2021

Today, I worked on:

* Getting a customer's data for the account page
  with Asa

Asa and I wrote some SQL. We tested it out with
Insomnia and the UI. We had to coordinate with
Petra who was working on the GHI with Azami.

Today, I found the F2/Rename symbol functionality
in Visual Studio Code! It allows me to rename a
variable without causing bugs. I am going to be
using this a lot!

## July 7, 2021

Today, I worked on:

* Signing up a customer with Petra

Petra and I had a hard time figuring out the logic
for what happens when a customer signs up. We
finally came to the conclusion that not only did we
have to create the `User` record, but we also needed
to create associated preference records **and** had
to log them in.
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