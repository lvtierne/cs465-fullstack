# cs465-fullstack
## Module 3: Static HTML to Templates with JSON
- In this module, we are going to replace static HTML with templates that will utilize JSON to
format and display information. 
### Create Git Branch for Module 3
- Before you begin, it is important to make sure that you have created your new branch in git for
Module 3. To accomplish this, we will perform the following command in a PowerShell window
in the travlr project directory:
  - git checkout -b module3

<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/4c28599a-9fc1-48ed-9c49-72b57f81b9af" alt="image" width="400"/>
</div>

### Replacing Static HTML with Templates
- We are going to be working on the Trips displayed on the Travel page on the website. We have
already started to update the raw travel.html page by turning it into a rendered page using
handlebars. We have separated out the header and footer into partials and reduced the code in the
remaining template. Now we are going to work on the content of the trips displayed on the page.
- To accomplish this, we are going to replace the hard-coded HTML trip content with a loop that
will render JSON data using handlebars directives. 

1. This is the display of one of the trips currently embedded as static HTML on the page:
....

2. To enable the transition to a handlebars loop, we will first begin by creating a data folder
in the main travlr project directory. In the new data folder, we will create a trips.json file
that will contain a JSON description of the trips for the purposes of testing. Please Note:
We are asking you to add the name of the trip to the description line in each trip
instance so that it is evident when the JSON data is being rendered instead of just
displaying the static HTML.
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/01acb1ea-8529-4262-810f-81444ba067d5" alt="image" width="400"/>
</div>

3. The next step will be to edit the travel.js controller file in order to use the built-in
NodeJS filesystem component to read the data file that we just created. We will be using
the fs.readFileSync() method to retrieve the JSON.
  - var fs = require('fs');
  - var trips = JSON.parse(fs.readFileSync('.data/trips.json',
  - 'utf8'));
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/83a6b9ef-2e49-4d70-a3fc-bfc61b172d9e" alt="image" width="400"/>
</div>

*Please Note:* It is not a best practice to read a JSON file every time the webserver
processes a request. This is a method used during development to support rapid
prototyping and should be replaced before the applications goes into production.

4. The final step in this process is to edit the travel.hbs template and replace the static
HTML list entries for the trips with a {{#each trips}} {{/each}} directive. This is handlebars
notation to create a loop for each object in the ‘trips’ data collection, allowing you to
process each object in a consistent manner.
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/96466379-8bb9-4fd9-bf79-aca2ec83b3ac" alt="image" width="400"/>
</div>

- At this point, you can restart your webserver, and test to make sure that you are now
seeing the rendered code which will have the name of the trip in the description as well.
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/f9f86063-e79c-4776-a3ee-ae0a1201afda" alt="image" width="400"/>
</div>

Your effort has replaced 120 lines of static HTML with 35 lines of code including 3
different handlebars directives that allow the rendered page to be driven dynamically
with data passed in to the template.

*Optional Challenge:* Using the techniques that you have just learned, repeat these steps
to convert other static HTML pages to Handlebars templates, either with or without
JSON data. This is your opportunity to experiment!

### Finalizing Module 3
1. Now that we have completed Module 3, we go back to git and make sure that we add
everything to tracking. We start by checking the status of what has changed (git status):
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/07776ee1-bd7a-4720-bc4a-146edae74e7a" alt="image" width="400"/>
</div>

2. Then we add all of those changes into tracking (git add .):
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/384f2e4f-ddbb-4916-bb0f-095d8017b622" alt="image" width="400"/>
</div>

3. Now we commit the changes (git commit -m 'Module 3 completed baseline'):
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/747ad010-ff07-4edb-a9e3-63eb87e19c92" alt="image" width="400"/>
</div>

4. We push the changes back to GitHub for safekeeping (git push --set-upstream
origin module3):
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/742870e2-e29b-422f-81c5-787fb8e25730" alt="image" width="400"/>
</div>


