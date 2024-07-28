# cs465-fullstack
## Module 3:
### Create Git Branch for Module 2
- Perform the following command in a PowerShell window in the travlr project directory:
  - git checkout -b module2

<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/3ff19ab3-764c-43a4-bcd9-b58053ef1650" alt="image" width="400"/>
</div>

### Create Web Application Folders
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



