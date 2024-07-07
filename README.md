# cs465-fullstack
### Screenshots of process:
Configure PowerShell to Accept and Run Scripts:
- Get-ExecutionPolicy -List 
- Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
- Get-ExecutionPolicy -List
  
![image](https://github.com/lvtierne/cs465-fullstack/assets/136281319/29c096ad-90d1-474e-acb3-7415eeac86b7)

### Create Your Initial Website:
Open a Windows PowerShell Command Prompt and make certain that you are in the
root directory of your travlr folder:
- cd ~/travlr
  
In the next step, we are going to create and initialize a Node Express web application,
configured with the Handlebars (HBS) view engine
- First, install the Express application template generator using the -g switch for
global installation, which will make the generator available for all projects.
  - npm install -g express-generator
- Generate an (empty) Express web application using the Handlebars view engine
and a default Git configuration, if one does not already exist.
  - express --view=hbs --git --force
    
![image](https://github.com/lvtierne/cs465-fullstack/assets/136281319/eff95521-4705-45b4-b20c-6084b4c3e94d)

- Launch the Visual Studio (VS) Code editor and open the newly created Express website.
- Edit the “.gitignore” file and add instructions to ignore the VS Code working files when
committing your source code to Git by copying the following:
  - .vscode/*
  - !.vscode/settings.json
  - !.vscode/tasks.json
  - !.vscode/launch.json
  - !.vscode/extensions.json
  - *.code-workspace
    
![image](https://github.com/lvtierne/cs465-fullstack/assets/136281319/66e6c386-a281-4b9d-9e49-0160a91ce577)

- Back in the Windows PowerShell command window, install the Node packages
automatically included in packages.json when the website was generated using the
following command:
  - npm install
- You will note that you may see an indication that some of the packages installed are the
subject of current vulnerabilities. It is always a good idea to view the vulnerability report
to determine what may need to be done before continuing. We will accomplish this with
the following command:
  - npm audit
- While it is always important to eliminate vulnerabilities in your software wherever and
whenever possible, it may not always be possible due to compatibility (or
incompatibility) between modules in an application.
- Note: It is always a good practice to save your current work to git and perform an update
on the impacted packages. If your application breaks, you can blow the directory away,
re-run the simple install, and recover your last known good configuration directly from
git.
- Should you choose to run the package upgrades, you can accomplish this by running: 
  - npm audit fix --force
 
![image](https://github.com/lvtierne/cs465-fullstack/assets/136281319/2e0d159a-59ad-4ed1-a1a9-f6b190160e78)
![image](https://github.com/lvtierne/cs465-fullstack/assets/136281319/b646b1a9-fd2b-4c58-87e2-03130310f1ef)

there was the same server on so i had to terminate the previous one and redo it again...

![image](https://github.com/lvtierne/cs465-fullstack/assets/136281319/1aa84a02-c359-45f5-9766-fa16007d81a2)

### Install Static Web Files
Now that we have the basic web site up and running it is time to add the static web files that you
downloaded in the travlr.zip file from the Assignment Guidelines and Rubric for Assignment 1-
6.
- Open two Windows Explorer windows so that you can focus on the directory containing
the unzipped files in one window, and the travlr directory in the other.
- Copy the .html files to the public directory beneath travlr (drag and drop).
- Copy the files from the image directory to the public/images directory in the travlr
folder.
- Copy the stylesheet from the css folder to the public/stylesheets folder.
- Stop and restart the Node.JS webserver. You can accomplish this by pressing ctrl-C in the
Powershell window that is currently running the webserver. This will stop the webserver
and then it can be started up again with ‘npm start’.
- Here, you will see that style.css is not found at all. This is the output from running the
npm command. You can see that the application is looking for the style.css file in the /css
folder from the website. We can accomplish this by renaming the public/stylesheets
folder to css and restarting the webserver.
- Please Note: Express assumes that the default directory for the .css files is stylesheets –
but it is easier to rename this than it is to edit all of the files in the example website.

Once you have restarted the webserver, you should check it with your browser:

![image](https://github.com/lvtierne/cs465-fullstack/assets/136281319/5a9860fb-fdf3-4a87-b44e-97a289baa20c)

Reload the page in your browser and you should see this now:

![image](https://github.com/lvtierne/cs465-fullstack/assets/136281319/0ac2873f-bfa9-4825-bad2-4eb658e15ead)

### Finalizing Module 1
The final step for Module 1 is to validate that you have all of your code in GitHub and under
configuration control.
From your PowerShell command window, from the travlr directory, check the status of your
files:
- git status
