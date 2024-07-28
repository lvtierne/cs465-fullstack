# cs465-fullstack
## Module 4: NoSQL Databases, Models, and Schemas
- In this module, we are going to take the next step and integrate our code with MongoDB, a
NoSQL database. This will be much more efficient for storing JSON documents than trying to
read them from the file-system every time a request is made to the database.

### Create Git Branch for Module 4
- Before you begin, it is important to make sure that you have created your new branch in git for
Module 4. To accomplish this, we will perform the following command in a PowerShell window
in the travlr project directory:
  - git checkout -b module4
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/3e699b15-5d2d-45cc-bb55-41a96cf5e21a" alt="image" width="400"/>
</div>

### Install and Configure Mongoose
- Begin by installing Mongoose. Mongoose is the NodeJS package that enables interaction
with a MongoDB database. This will be installed similarly to any of the other NodeJS
packages, via NPM.
- (in the image above) as [ npm install mongoose ]

### Create the folders needed
1. Now we will create a new models folder underneath the app_server folder for our
application. This is where we will create a module that will hold the schema for our trips.
This module will be named travlr.js.
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/a62deba6-e193-41b0-973a-83ae1a2bdd05" alt="image" width="400"/>
</div>
- *Please Note* the highlighted portion of the previous image. The trip code and name will be
indexed in MongoDB for faster retrieval. The start date will be stored using the ISO standard
date format, and the collection will be named ‘trips’.

2. We can use the db.js module from Chapter 5, section 1 of your textbook with only minor
changes for our project. The code is reflected in pdf given.

### Seeding the Database
- The next step in the connection of our application to the database is putting some seed data into
the Database. There are multiple ways that we can accomplish this – you can use Mongo
Compass to create the database, the collection, and add seed data, and you could do the same in
DBeaver. However, we are going to take a different route and seed the database by leveraging
some of the code that we have already built and creating a small Node JS script to insert data into
the database.
1. The first step we need to take is to adjust the trips.json data file that we created earlier in
order to provide the additional properties that we identified for our schema. In this case, we
are going to add key-value pairs for the new attributes: code, length, start, resort, and perPerson.
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/594433b0-1689-4c3e-b94a-c2cfd5a025dd" alt="image" width="400"/>
</div>

2. Next, we need to create a new file in the models directory in the travlr application named
seed.js. This will be the script that we utilize to enter the seed data into our MongoDB
instance.
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/75f212da-811e-4893-ad02-7403f24dafaf" alt="image" width="400"/>
</div>
Using this method to seed the database, we will remove any existing records each time we rerun the seed script. You can modify the number of records seeded by editing the trips.json
file.

3. Now that we have the seed script created, we will execute the script. The execution is a little
bit different than what we have used before because we will be using node directly, and not
invoking it through the package manager.
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/b203390d-6abd-4b54-ae4d-828ad961756d" alt="image" width="400"/>
</div>
(had to reinstall mongoDB)

4. The next step is to use Mongo Compass or DBeaver to verify that the data has been loaded
in the database. Using Mongo Compass, we will connect to the instance of MongoDB
running on our localhost (select Connect to proceed):
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/dc1dff5d-9a0d-49eb-9928-531b4c39e387" alt="image" width="400"/>
</div>

5. At this point you should see that the travlr database exists and contains a ‘trips’ collection:
6. Selecting the ‘trips’ collection will allow you to see that three records have been added to
the database.
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/4ac3b02d-cbdd-48fd-8dc5-9bfebe9dee79" alt="image" width="400"/>
</div>

### Finalizing Module 4
1. Now that we have completed Module 4, we go back to git and make sure that we add
everything to tracking. We start by checking the status of what has changed (git status):
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/61ec6d1a-d501-468c-abb9-dea7a7e521ae" alt="image" width="400"/>
</div>

2. Then we add all of those changes into tracking (git add .):
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/a17596ea-5722-4244-923a-1d10c38dd6ec" alt="image" width="400"/>
</div>

3. Now we commit the changes (git commit -m 'Module 4 completed baseline'):
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/de65f174-ac42-4035-904d-5362b6259e0c" alt="image" width="400"/>
</div>

4. We push the changes back to GitHub for safekeeping (git push --set-upstream
origin module4):
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/2a908737-5175-4da9-8e68-e0a2d123ffbd" alt="image" width="400"/>
</div>


