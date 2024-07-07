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


