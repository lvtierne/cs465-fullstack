# cs465-fullstack
## Module 2:
### Create Git Branch for Module 2
- Perform the following command in a PowerShell window in the travlr project directory:
  - git checkout -b module2

<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/3ff19ab3-764c-43a4-bcd9-b58053ef1650" alt="image" width="400"/>
</div>

### Create Web Application Folders
- Create an app_server folder where we'll migrate the static HTML to Handlebars
template views, and refactor common functionality such as headers and footers into
"partials".
- In VS Code, create a new folder named ‘app_server’ under the travlr project.
- Move the existing routes and views folders into the new app_server folder. You can do
this with drag-and-drop in VS Code.

### Creating Controllers and Routes
- With the app_server folder selected, click the new-folder icon and create a folder named
Controllers.
- Once the controllers folder is present, select the folder and then use the Create-File icon
to create a new file that will be named main.js that will be the first controller for this
application.
- Edit the main.js file – this is where we will wire up the controller to serve the main index
page. Don’t forget to save the file when you are done!
- Next we need to edit the index.js file in the routes directory to pass the request for the
site-default starting page (often referred to as the the ‘root’ or “/”) to our new main
controller. We will do this by adding a reference to the controller and altering the
function that gets passed to the get call for the index. Don’t forget to save the file when
you have completed your edits!
- Next, we need to create a controller for the travlr page. This is a repetitive process of
what we went through to create the main controller. Create the controller for the travlr
page (Don’t forget to save the file when you are done making changes!)
- Similar to what we did for the main controller, we now need to add a route for the travlr
controller (Don’t forget to save the file when you are done making changes!)
- Finally, we need to edit the app.js file to add the app_server folder to the application
path, and wire up the travlr controller connecting it to the route for the ‘/travel’ page.
Don’t forget to save the file when you are done making changes!

### Creating Handlebars Views
The next step will be to create the handlebars views that are necessary to begin transitioning
from static html to generated code.
- The first step in this process will involve taking the travel.html file found in the public
folder of the travlr website and copying it to the app_server/views folder and changing
the extension from .html to .hbs – a designation that will inform the express server
engine that it will be rendered with the handlebars processor.
- Upon examination of the travel.html file (now named travel.hbs) you will notice that all
of the static .html files have the same code for the headers and footers of the pages. 
- One of the features of the handlebars view engine is support for partial page fragments
that hold common html to avoid duplication of code within your website. The eliminates
the need to code the same redundant data on each page. To use this capability, we will
first create a partials folder under the views folder in the website hierarchy.
- In the partials folder we will create a new file called header.hbs and we will populate
that with the <div> header block from the travel.hbs file. At the same time, replace the
anchor reference travel.html with /travel in order to route the link through the
handlebars processing engine. Don’t forget to save the file when you are done making
edits!
- Handlebars uses double curly braces to distinguish its code blocks from ordinary HTML.
The greater than symbol is an instruction to the templating engine to include the header
view, specifically to replace the instruction tag in the traveler.hbs file with the contents
of header.hbs. To accomplish this, we will replace the entire <div> block in the
travelr.hbs file with a single tag referencing our new handlebars partial. (Don’t forget to
save the file when you are done making edits!)
  - {{> header }}

- Repeat steps 4 and 5 above to create a footer partial page called footer.hbs
- For the next step, we are going to create one more sub-folder underneath the views
folder. This one will be named layouts. When the folder has been created, we want to
move the layout.hbs file into that layouts folder.
- The last step necessary to enable the appropriate rendering of these handlebars views is
registering the partials directory with the templating engine. To do this, we need to once
again edit the app.js file and add a small code block to register the partials directory.
- Now that we have made many changes, it is time to test this. Restart your webserver
(npm start in the travlr sub-directory in PowerShell) and check the webpage.

<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/aec8afa6-0740-4d74-a92d-a718ba98fddd" alt="image" width="400"/>
</div>

### Finalizing Module 2

<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/9f80ffcd-734b-42f1-9ee3-410785ae33e3" alt="image" width="400"/>
</div>

- I accidenty put it in my main branch instead so i... looked at current branch then cherry-picked commits of main to module2.
- Now we commit the changes (git commit -m 'Module 2 completed baseline')
- Push the changes back to GitHub for safekeeping (git push --set-upstream origin module2)

<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/36115c43-8bf2-478d-adcd-3489feee104c" alt="image" width="400"/>
</div>
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/5654845e-2df8-450d-b1dc-b08e57031ff3" alt="image" width="400"/>
</div>

## Made a simply but costly error in the app.js file:
- I was still in the Cherry-Pick Operation so:
  1.) Review/ Make Changes: in app.js
  2.) Add Changes: stage the changes to be committed "git add app.js"
  3.) Continue the Cherry-Pick: when satisfied "git cherry-pick --continue"
  4.) Verify Status: check "git status"
  5.) Commit Untracked Files: include app.zip and app_server.zip in your repository, add and commit them:
  git add app.zip app_server.zip
  git commit -m "Add zip files for app and server"

<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/dac91365-3177-42cc-aa32-072691d57ecb" alt="image" width="400"/>
</div>

<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/e5b7fabf-b3f6-43c5-ba42-8aaff73b7ff3" alt="image" width="400"/>
</div>



