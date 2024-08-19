# cs465-fullstack
## Module 7: Security
- In this module, we are going to take the next logical step in creating our application by applying
security to both the front-end and the back-end of the application. There are many different
aspects of application security, and this Full-Stack guide will not attempt to cover all of them.
However, we will be addressing some very common security related items and issues that will
set you on the path to develop secure software following best-practices common throughout
industry.

### Create Git Branch for Module 7
- Before you begin, it is important to make sure that you have created your new branch in git for
Module 7. To accomplish this, we will perform the following command in a PowerShell window
in the travlr project directory:
- git checkout -b module7 
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/a9057de8-92f5-41a1-9c9f-7e79e5332016" alt="image" width="400"/>
</div>


### Introduction
- As you are aware, one of the key components of developing an application is security. This is a
complex subject with many facets to explore across the landscape of software design and
implementation and any course can only cover a portion of the overall topic. What we will be
exploring in this full stack guide will cover securing the Express application and Angular
application by requiring the user to login and authenticating their credentials.
- Aspects of adding security to support the authentication of users is covered in Chapter 11 of your
textbook. This Full-Stack guide will walk you through the implementation of a security plan that
fits the Travlr application, and indicate the decision points where you would have to make an
implementation choice if you were performing a similar task in a different application.


### Adding User Registration and Login to the Express Backend

- In order to begin the process of adding authentication to the Express backend for our application,
we need to add some additional packages in our node environment. These packages are:
  - jsonwebtoken – Package for manipulating JSON Web Tokens
  - crypto – Package for handling cryptographic operations
  - dotenv – Package for reading environment information from a dot-file in the app
  - passport passport-local – Packages for handling authentication, and a strategy for handling local authentication
  - express-jwt – Packages for to enable JSON Web Tokens within Express

    
1. We begin by installing the above packages into our Express environment. Start in the root of
the travlr application tree.
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/1aceb7c3-7ab3-4728-a069-3210faddbd45" alt="image" width="400"/>
</div>


2. The next thing we are going to do is setup a Secret – a long text string that would be very
difficult to guess – and store it in a file named .env in the travlr folder for our application.
This file needs to be listed in the .gitignore file so that it does not get stored in git. It is very
bad practice to store any of your secrets in a source-code repository where they can be seen
by anyone that can view the repository. We will put the following string in the .env file.
- JWT_SECRET=#####################
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/12b6e428-d99f-473c-81ec-1b57d600431e" alt="image" width="400"/>
</div>
- And we verify that .env files are listed in our .gitignore file so they don’t end up in our
repository.


3. The next step we must undertake is to add an additional schema to our Mongo Database to
handle users. This is necessary as we are planning on doing local authentication of users and
we need a location to store the necessary information so that we can authenticate
individual users later. The User schema is going to need to be able to hold four different
datapoints for each record: email, name, hash, and salt. These four attributes will allow us
to identify individual users and verify their authenticity by comparing an encryption of the
password they provide with the encrypted hash stored in the user record. 
- The new Mongoose schema will be stored in the /app_api/models/user.js file
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/ac6125eb-84f0-4190-a841-eb6d16c3b4ba" alt="image" width="400"/>
</div>


4. Unlike some of the other files we have in our models folder, we have to make some
additions to the user model so that we can use the user objects throughout our application.
In this respect, we will be adding three additional methods to our file:
  - setPassword – a method to set the password for the user record
  - validPassword – a method to verify that the password submitted was the same as the one stored in the user record
  - generateJWT – a method to return a JSON Web Token for the specific user record
    
  a. First, we need to add two additional constants to our file to enable both the cryptography aspect of our functionality and the JSON Web Tokens.
    - const crypto = require('crypto');
    - const jwt = require('jsonwebtoken');
      
  b. Next, we look at our setPassword method. This is a void method that takes a single argument, the user’s new password, and generates a cryptographically random 16-byte salt to be utilized to generate our hash. It stores the salt value, and the resulting hashed password in the user record. This is necessary because without the salt, the password hash cannot be compared. These processes lean heavily on the crypto module and the two methods:
  - randomBytes(bytes) – Generates number of cryptographically random bytes based on the argument that is used to seed cryptographic operations.
  - pbkdf2Sync(password, salt, iterations, keylen, digest)
  - Password-Based Key Derivation Function that will provide ab unique key based on the password, salt, number of iterations, specified length, and digest algorithm specified. We will be using a 16-byte salt and 1000 iterations for this application. Increasing either or both values makes the password slightly more secure with the trade-off of increased processing time. 
      - The code for this method looks like this: <br>
          // Method to set the password on this record. <br>
          userSchema.methods.setPassword = function(password){ <br>
            this.salt = crypto.randomBytes(16).toString('hex'); <br>
            this.hash = crypto.pbkdf2Sync(password, this.salt, <br>
              1000, 64, 'sha512').toString('hex'); <br>
          }; <br>

  c. Next we look at our validPassword method which will provide us with an indication of whether or not the password provided matches the stored value, although it cannot be a direct match as the stored value has been hashed. This is a Boolean method that takes a single argument, the       user’s password. Again, this method makes use of the pbkdf2Sync method from the setPassword method to generate the password hash that is compared to the stored value. The return value is the result of a Boolean evaluation of equality between the stored value and the calculated           value based on the given input. The processing in this method must match the processing in the previous method for a test of equality to be valid.
      - The code for this method looks like this:
          // Method to compare entered password against stored hash <br>
          userSchema.methods.validPassword = function(password) { <br>
          var hash = crypto.pbkdf2Sync(password, <br>
          this.salt, 1000, 64, 'sha512').toString('hex'); <br>
          return this.hash === hash; <br>
          }; <br>

  d. Next, we will look at the generateJWT method that we will use to create the JSON Web Token that our application will use to pass the application and indicate that we have the necessary permissions to act in the controlled portion of the application. For this method, we are going to leverage the sign method from the jsonwebtoken package. The format that we will be using will utilize three parameters for the call:
  - payload – This is the JSON object that we want to pass as part of the authentication process. This can contain values that the application can then use to make decisions on to determine access permissions.
  - secret – This is the secret that we have stored in the .env file. This method of generating the JWT is not the only method, but it is a straight-forward application that we will be utilizing here.
  - expiration time – We are passing this as the third parameter because it is a more clear implementation than adding and exp value in the JSON payload.
      - The code for this method looks like this:
          // Method to generate a JSON Web Token for the current record <br>
          userSchema.methods.generateJWT = function() { <br>
          return jwt.sign( <br>
          { // Payload for our JSON Web Token <br>
          _id: this._id, <br>
          email: this.email, <br>
          name: this.name, <br>
          }, <br>
          process.env.JWT_SECRET, //SECRET stored in .env file <br>
          { expiresIn: '1h' }); //Token expires an hour from creation <br>
          }; <br>

  e. Finally, we make one last change to our user.js file. At the end of the file where we have defined the model name of users and bound it to our schema, we are going to define a constant and export that constant from our module. This will make the utilization of this schema very straightforward in other modules.
  - const User = mongoose.model('users', userSchema);
  - module.exports = User;


5. The next step in this process is to build a configuration for the passport module we are using to process our authentication verifications. Passport is a ‘Strategy-Based’ authentication module, meaning that it can use various strategies to authenticate a user based on programmatic design. The reason we are using Passport here is because it supports a localauthentication strategy that is compatible with our Mongo Database. However, by simply changing the authentication strategy you can change the mechanism from using our local Mongo Database to a variety of other mechanisms from authenticating against a corporate LDAP directory to signing in with google.
- We will begin by creating the folder config beneath app_api and creating a passport.js file within that folder. The contents of the file should look like this:
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/f352c8be-2044-49ba-893a-2687114c80dc" alt="image" width="400"/>
</div>


6. The next step will be to create a controller for authenticating users. This will be created in the file /app_api/controllers/authentication.js. We will begin by creating a controller that will handle user registration. This will allow us a convenient point to test what we have accomplished so far prior to moving forward with a login capability.
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/935d4047-c638-4669-a324-7c36acc41939" alt="image" width="400"/>
</div>


7. In the next step, we will register the new route for the registration controller in /app_api/routes/index.js. This is a repeat of what we have already done for the trip controller and should be becoming more familiar. We will do this again once we have tested the registration method and we build the login method. 
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/e52640d5-8bc8-424f-a2a0-73c234dee1b1" alt="image" width="400"/>
</div>


8. There is one more change we have to make prior to testing our registration endpoint, and that is adding the code to the app.js file to pull in the contents of our .env file. For this, we need only add the following line to the app.js file:
    - require('dotenv').config();
- This line pulls in the dotenv module, and the config() method reads the .env file, allowing us to bring the variables defined in the file into our memory space. Make sure that you restart your server after making this change.


9. Now that we have our first of the two new controllers wired up to our application it is time to try and test the controller with Postman. To do this, we need to setup a Postman query that will send the name, email, and password attributes in the x-www-form-encoded format in the body of the post request. When we execute send, it will send the request to the register endpoint, create a new user in our Mongo DB, and return a JSON Web Token representative of that user.
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/495c4732-f5c4-491a-b810-45092cc4c6fb" alt="image" width="400"/>
</div>
  - Once we have this JSON Web Token, we can verify that it is correct by going to the onlineverifier at https://jwt.io and pasting our token into the Encoded box on the left and pasting our secret (everything to the right of the = in the .env file) in the textbox on the lower right in the ‘Verify Signature’ block. You should see the note: ‘Signature Verified’ in the lower left-hand side of the page:
<div align="center">
  <img src="https://github.com/lvtierne/cs465-fullstack/assets/136281319/c2d24cb0-4bc1-41fc-b4aa-4529c1c77fd1" alt="image" width="400"/>
</div>


10. Now that we have the first endpoint built that allows us to register a user, we need to build the second endpoint. We will begin this task by building the second controller that we will be using for the /login endpoint. There are three parts to this process, and all of the code for
this controller will go in the /app_api/controllers/authentication.js file. 
- The first part of this process will be to pull in one more package for use by the login controller. The following should be placed at the top of the file to pull in the passport module:
      - const passport = require('passport'); <br>
![image](https://github.com/user-attachments/assets/795fa7f5-66ee-4d8c-99af-bf39ccc6179f)

- The next part of the controller will be the controller method itself. This method will delegate the authentication process to the passport module and process the results of that authentication call. If everything works, then a new JSON Web Token will be returned.
      - const login = (req, res) => { <br>
        // Validate message to ensure that email and password are present. <br>
        if (!req.body.email || !req.body.password) { <br>
        return res <br>
        .status(400) <br>
        .json({"message": "All fields required"}); <br>
        } <br>
        // Delegate authentication to passport module <br>
        passport.authenticate('local', (err, user, info) => { <br>
        if (err) { <br>
        // Error in Authentication Process <br>
        return res <br>
        .status(404) <br>
        .json(err); <br>
        } <br>
        if (user) { // Auth succeeded - generate JWT and return to caller <br>
        const token = user.generateJWT(); <br>
        res <br>
        .status(200) <br>
        .json({token}); <br>
        } else { // Auth failed return error <br>
        res <br>
        .status(401) <br>
        .json(info); <br>
        } <br>
        })(req, res); <br>
        }; <br>
![image](https://github.com/user-attachments/assets/67dea85f-f7cb-487f-bf65-00e5082452db)

- The third and final part of this change is adjusting the exports statement for this module to
also export the login controller in addition to the already running register controller. To
make this work, please update the module.exports block as follows:
  - // Export methods that drive endpoints. <br>
    module.exports = { <br>
    register, <br>
    login <br>
    }; <br>
![image](https://github.com/user-attachments/assets/676e3ba7-c9fd-4b16-b3a6-303cdd2cc777)


11. Now we must go back and add the route for our new login endpoint. This is an edit to the /app_api/routes/index.js file. We could have made this change when we were adding the register endpoint, but it is generally good practice to restrict changes to one thing at a time when building an application to reduce the complexity of any debugging operations. Since we have already added the register endpoint we don’t need to pull in the authentication module again, we just have to add the code for the login endpoint.
  - // define route for login endpoint <br>
    router <br>
    .route('/login') <br>
    .post(authController.login); <br>
![image](https://github.com/user-attachments/assets/00c9ddff-8bd3-456b-ae71-7852611621d2)


12. The next portion of wiring up the login controller in our application requires some additional changes to the app.js file. We need to wire in the passport module so we will be adding two stanzas to our file at the bottom of the variable section:
    
    - // Wire in our authentication module <br>
      var passport = require('passport'); <br>
      require('./app_api/config/passport'); <br>
  
- And we must add an initializer for our passport module which we will place beneath the express.static statement like this:
  
      - app.use(express.static(path.join(__dirname, 'public'))); <br>
        app.use(passport.initialize()); <br>

- And we must add an additional tag to our ‘Allow-Headers’ line in the block that we use to define our CORS capabilities. The tag that we will add allows Authorizations.
![image](https://github.com/user-attachments/assets/91f4d43e-7d9b-4e0c-9534-99bda2ae9d16)

- Finally, we add a block to catch an error that would indicate an Unauthorized login attempt.
      - // Catch unauthorized error and create 401 <br>
        app.use((err, req, res, next) => { <br>
        if(err.name === 'UnauthorizedError') { <br>
        res <br>
        .status(401) <br>
        .json({"message": err.name + ": " + err.message}); <br>
        } <br>
        }); <br>

13. Once we have made these changes, we can restart our application and test with Postman.
For these tests, we will use the user we created in step 9. For this process, we need to
define a POST body with email and password variables defined. Pressing send should result
in the return of a new JWT token.

### Wrapping Express API Calls for Authentication
- Now that we have our endpoints created to allow for user registration and login, we need to
determine how we are going to require our API methods that change data in the database to
require authenticated users. While this is challenging, it is not the only challenge in dealing with
application security as this covers authentication but not authorization. This Full-Stack guide will
complete the authentication portion of development but it will be left to the reader to experiment
with the code and determine how to add authorization capabilities into the codebase. For now,
we will assume that any authenticated user is authorized to make changes (dangerous in
production but common in a development environment).
- To address the authentication portion, we will be creating a method based on the jsonwebtoken
package and inserting the function as middleware in our route model. This will insure that the
authentication method is run whenever a protected route is accessed. The method will grab the
authentication token from the request header and validate the token. If the token is broken,
malformed, or expired, the access request will be rejected with a 401-error message.
- We will begin by inserting one more line of code at the top of the /app_api/routes/index.js file to
pull in the jsonwebtoken package. 
  - const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens
- Then we will create a method that we will name authenticateJWT, because its job is to
authenticate JWTs. You will note that there are several console.log statements here. The purpose
of these statements is to give you an opportunity to see what is happening while the code is
running as the console.log will print to your PowerShell window where you are running your
Express application. The process is straight-forward. Pull the authorization header from the
request, parse out the JWT and verify. If the token verifies, put the decoded token back onto the
request object as the auth attribute, if not return a HTTP 401 error. The code for this method
follows: 
              - // Method to authenticate our JWT
                function authenticateJWT(req, res, next) {
                // console.log('In Middleware');
                const authHeader = req.headers['authorization'];
                // console.log('Auth Header: ' + authHeader);
                if(authHeader == null)
                {
                console.log('Auth Header Required but NOT PRESENT!');
                return res.sendStatus(401);
                }
                let headers = authHeader.split(' ');
                if(headers.length < 1)
                {
                console.log('Not enough tokens in Auth Header: ' +
                headers.length);
                return res.sendStatus(501);
                }
                const token = authHeader.split(' ')[1];
                // console.log('Token: ' + token);
                if(token == null)
                {
                console.log('Null Bearer Token');
                return res.sendStatus(401);
                }
                // console.log(process.env.JWT_SECRET);
                // console.log(jwt.decode(token));
                const verified = jwt.verify(token, process.env.JWT_SECRET, (err,
                verified) => {
                if(err)
                {
                return res.sendStatus(401).json('Token Validation Error!');
                }
                req.auth = verified; // Set the auth paramto the decoded object
                });
                next(); // We need to continue or this will hang forever
                }

  - There is one more thing that we need to do. We need to inject our new middleware method into the route for our tripsAddTrip and our tripsUpdateTrip controllers.
    ![image](https://github.com/user-attachments/assets/07b7bf56-990d-44a5-98c7-479351010a97)

  - Once we have saved the file and restarted our application, we will no longer be able to test these endpoints with Postman without first authenticating
    
### Testing API Calls that Require Authentication
- Fortunately, Postman provides a very good resource for testing API calls that require authentication. We will first go back to the test that we performed when we built the login API endpoint. We will setup a Postman call to login to our API and get a clean JWT. This is often necessary as the token is currently configured to expire after an hour – so when you are testing it is often advisable to hit the login endpoint first to avoid chasing a problem that is really an expired token.
- As we tested previously, you need to create a POST call to http://localhost:3000/api/login and you need to make sure that you add the email and password attributes to the body as x-wwwform-urlencoded parameters. 
![image](https://github.com/user-attachments/assets/4cb7c9fd-e280-4fcc-b2a1-e3b1cebf704c)

- This will result in the API returning a JSON object and the value of the ‘token’ parameter that is returned is your JWT. To make the next test, you will want to create another Postman call. We will use the PUT verb to make a change to one of our trips. Before we change anything, we are going to want to add some data to the Authorization tab. This is where Postman handles the necessary mechanics to provide Authorization headers for your call.
- The type of Authorization you will want to select is called ‘Bearer Token’. This is the category of Authorization Tokens that a JWT belongs to. You then need to copy the contents (between the quotation marks only) into the field labeled Token.
- This allows Postman to send the necessary headers to our API. The next thing we will do to setup our test is to add a parameter to the ‘Body’ tab. This will be the parameter we want to change for our trip. In this case, I am going to change the name of the trip to “Most Excellent Mega Reef Dive”. When you press the ‘Send’ button you should see something like:
![image](https://github.com/user-attachments/assets/c4a3c871-b3e1-46eb-8590-e11a95f6a670)

- As you can see, the change was made as expected. But this just tests what is supposed to happen if everything goes well. So what does it look like if there are problems? Let’s test this by changing our Authorization configuration. If you go back to your Authorization page, change one character in the Token (it doesn’t matter which one or how you change it), and re-send the query. In my example, I am changing the last character in the Token from a w to an x. And this is the result:
  - As you can see from this test, our middleware is working as we have designed it and will prevent
access from anyone that does not have a valid bearer token.

### Add Authentication to the Angular SPA Frontend
- Now that we have the backend squared away and requiring authentication for the methods that permit data to be altered in our database, we must address the front-end application. You will note that at this point, the Angular application will still run and display the trip cards, but trying to perform an Add or Edit function will fail. So we need to determine what has to happen in order for us to utilize the new protected API calls that we implemented in our Express application. Chapter 12 in the textbook covers some of the aspects of adding security to support user authentication and protecting associated programmatic resources and is a good reference for the structure behind what we will now attempt.
- If we were to list the items that need to be addressed to accomplish this, it would look something like this:
  1. Determine and implement how we are going to handle the storage of the JWT in our Angular application.
  2. Determine and implement how we are going to represent a user in our Angular
  application.
  3. Determine and implement how we are going to handle authentication from our Angular
  application to the Express back end.
  4. Determine and implement the necessary chances to the trip-data-service component to
  include the necessary authentication calls to the API endpoints.
  5. Determine and implement a mechanism that will provide the user a visual queue to
  ‘Login’ to our application.
  6. Implement the necessary component construction to support the ‘Login’ process
  identified by our visual queue.
  7. Implement the necessary routing for our new components.
  8. Modify the trip-card component to add any applicable display logic for the buttons.

### Data Storage for Angular Applications 
- When dealing with data items that must persist through some portion of an application there are several possible choices that need to be evaluated each with their own considerations. In the case of this application, we are dealing with the JWT and must be able to provide it back to the server-side APIs as part of each call. Because the server provides us with the JWT in the body of the response, we can remove the option of storing the data in a Cookie which is one of the more common storage methods for web applications. This has the fortunate benefit of protecting the application against Cross-Site Request Forgery (XSRF) attacks but comes with the downside of needing to manage the interaction with the JWT manually instead of allowing the browser to manage the cookie transactions automatically.
- A practical choice of handling the JWT is to take advantage of the Local Storage API which allows us to store Key/Value pairs in a manner where they are accessible to the application running in the browser. With this mechanism we will still be vulnerable to script-injection attacks (XSS) but there are always trade-offs to be considered when designing applications.
- We will begin by setting up a storage class for our Angular application that will allow us to inject access to our local data to any of our other components.
  - ng generate class storage
- The storage class should be created in the /app_admin/src/app folder and should contain the following code:
  - import { InjectionToken } from '@angular/core';
    export const BROWSER_STORAGE = new
    InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
    });
    export class Storage {
    }
- The constant BROWSER_STORAGE will be the token that is utilized when pulling the local storage capabilities into other components in our application.
![image](https://github.com/user-attachments/assets/901ec589-84c7-4f09-a0a2-8e8584c66000)

### Representing User Data in our Angular Application 
- The next thing that we must decide is how we will represent the data associated with our user in our application. The scope of this data structure will be reduced from how the data is represented in the Express application as we do not need to concern ourselves with storing and representing the password hash or the associated salt. We will create a utility class to hold the data objects that we will need to track, and we will move it into the
/app_admin/src/app/models folder.
  - ng generate class user
- The contents of the file should be quite simple as it will only need to track email and name attributes.
  - export class User {
    email: string;
    name: string;
    constructor()
    {
    this.email = '';
    this.name = '';
    }
    }
![image](https://github.com/user-attachments/assets/6860b3ea-9c4f-4692-81f1-509556b4f7f9)


### Handling Authentication in our Angular Application 

- Having decided upon the storage requirements for our JWT object and creating the data model to represent the user information we need to proceed with developing the mechanisms necessary to handle the authentication process. With the architecture provided by the Angular framework one of the common ways of addressing this requirement is to generate both a class to handle the representation of the JWT and a service to handle the authentication process. 
  1. We will begin by creating a class to represent the results of the authentication process. We will call this AuthResponse and it will also live in our models folder. This is purposeful because we can then utilize the same structure if we change our overall architecture in the future to utilize something other than JWTs.
  - The contents of this class are very minimal as the only attribute to track right now is the JWT.
    - export class AuthResponse {
      token: string;
      constructor()
      {
      this.token = '';
      }
      }
![image](https://github.com/user-attachments/assets/db59871f-fd95-464b-a6c9-92a08173122d)

  2. The next step is considerably more complex as we will build a new service to handle the operations associated with authentication. This service once created will be moved into our existing services folder to maintain the application structure.
        - ng generate service authentication
  - This generates the base contents of the new service which we will move into our /app_admin/src/app/services folder. Because of the complexity of this service, we will discuss each piece individually. The first will be the items that we need to import into the service to provide the access and features needed to develop our actions.
        - import { Inject, Injectable } from '@angular/core';
          import { BROWSER_STORAGE } from '../storage';
          import { User } from '../models/user';
          import { AuthResponse } from '../models/auth-response';
          import { TripDataService } from '../services/trip-data.service';
  - We need Inject and Injectable to manage our access to the Storage provider we created and because the service we are creating is itself Injectable in other Angular components. We need BROWSER_STORAGE as this provides access to our local Storage provider. The User object provides us a means of representing our user data, while AuthResponse provides representation for our JWT. Lastly, TripDataService is needed as the service will be modified to add our login and register endpoints with which we will interact.
      - // Setup our storage and service access
        constructor(
         @Inject(BROWSER_STORAGE) private storage: Storage,
         private tripDataService: TripDataService
        ) { }
        // Variable to handle Authentication Responses
        authResp: AuthResponse = new AuthResponse();


  - The constructor is straightforward, we Inject our storage provider so that its data contents are persistent across any modules or components where it is used. Additionally we wire up our TripDataService so that we can communicate with our API endpoints, and define a variable to handle Authentication Responses. 
    - // Get our token from our Storage provider.
      // NOTE: For this application we have decided that we will name
      // the key for our token 'travlr-token'
      public getToken(): string {
      let out: any;
      out = this.storage.getItem('travlr-token');
      // Make sure we return a string even if we don't have a token
      if(!out)
      {
      return '';
      }
      return out;
      }
      // Save our token to our Storage provider.
      // NOTE: For this application we have decided that we will name
      // the key for our token 'travlr-token'
      public saveToken(token: string): void {
      this.storage.setItem('travlr-token', token);
      }
      // Logout of our application and remove the JWT from Storage
      public logout(): void {
      this.storage.removeItem('travlr-token');
      }
  - Next, we build the accessor and mutator methods for moving data in and out of the local storage through our Storage provider. We have one additional method here, logout(), that will clear the local storage in the event that the user logs out. This will necessitate the user reestablishing credentials by logging in again if they wish to continue using the application.
    - // Boolean to determine if we are logged in and the token is
      // still valid. Even if we have a token we will still have to
      // reauthenticate if the token has expired
      public isLoggedIn(): boolean {
      const token: string = this.getToken();
      if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
      } else {
      return false;
      }
      }
      // Retrieve the current user. This function should only be called
      // after the calling method has checked to make sure that the user
      // isLoggedIn.
      public getCurrentUser(): User {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
      }
  - We build a Boolean method to validate whether the user is currently logged in and, if so, if their token is still valid. This is beneficial as we can test whether we need to login again before forcing the user down that path. Specifically, the isLoggedIn() method should always be called prior to the getCurrentUser() method in order to avoid an error condition that would arise if there is no data to retrieve.
    - // Login method that leverages the login method in tripDataService
      // Because that method returns an observable, we subscribe to the
      // result and only process when the Observable condition is satisfied
      // Uncomment the two console.log messages for additional debugging
      // information.
      public login(user: User, passwd: string) : void {
      this.tripDataService.login(user,passwd)
      .subscribe({
      next: (value: any) => {
      if(value)
      {
      console.log(value);
      this.authResp = value;
      this.saveToken(this.authResp.token);
      }
      },
      error: (error: any) => {
      console.log('Error: ' + error);
      }
      })
      }
      // Register method that leverages the register method in
      // tripDataService
      // Because that method returns an observable, we subscribe to the
      // result and only process when the Observable condition is satisfied
      // Uncomment the two console.log messages for additional debugging
      // information. Please Note: This method is nearly identical to the
      // login method because the behavior of the API logs a new user in
      // immediately upon registration
      public register(user: User, passwd: string) : void {
      this.tripDataService.register(user,passwd)
      .subscribe({
      next: (value: any) => {
      if(value)
      {
      console.log(value);
      this.authResp = value;
      this.saveToken(this.authResp.token);
      }
      },
      error: (error: any) => {
      console.log('Error: ' + error);
      }
      })
      } 
  - These final two methods are identical except for the methods they reference in our tripDataService. These deal with user registration and login. Please Note: these methods both require two parameters, the User and a password. The password is not part of the User object and is expected to be provided by a method or methods external to this service calling these functions.
  

  3. Now that we have built the AuthenticationService, we need to adjust our TripDataService to provide the additional endpoints for login and register that we are relying on in our new AuthenticationService. We need to start by adding three imports to the top of our tripdata.service.ts file. 
      - import { User } from '../models/user';
        import { AuthResponse } from '../models/auth-response';
        import { BROWSER_STORAGE } from '../storage';
  - We import the User object so that we can handle the two user parameters email and name. We import the AuthResponse object because that will be the type of Observable that we return from login and register, and we import BROWSER_STORAGE so that we have access to our persistent data. We also have to modify the import line for our Injectable capability to include Inject.
      - import { Inject, Injectable } from '@angular/core';
  - This allows us to update our constructor to inject our Local Storage provider.
      - constructor(
        private http: HttpClient,
        @Inject(BROWSER_STORAGE) private storage: Storage
        ) {}
  - Additionally, we will add one more variable, baseUrl to our class because we are no longer only using the trips endpoint. This will support additional endpoints in future development as well as providing support for our login and register endpoints.           
      - baseUrl = 'http://localhost:3000/api';
  - Next, we are going to add our methods for login and register. Because these are so similar, differing only in the URL path to their respective endpoints, we are going to refactor most of the code into a helper method so that we only must write and test it once. We will call this method handleAuthAPICall.
      - // Call to our /login endpoint, returns JWT
        login(user: User, passwd: string) : Observable<AuthResponse> {
        // console.log('Inside TripDataService::login');
        return this.handleAuthAPICall('login', user, passwd);
        }
        // Call to our /register endpoint, creates user and returns JWT
        register(user: User, passwd: string) : Observable<AuthResponse> {
        // console.log('Inside TripDataService::register');
        return this.handleAuthAPICall('register', user, passwd);
        }
        // helper method to process both login and register methods
        handleAuthAPICall(endpoint: string, user: User, passwd: string) :
        Observable<AuthResponse> {
        // console.log('Inside TripDataService::handleAuthAPICall');
        let formData = {
        name: user.name,
        email: user.email,
        password: passwd
        };
        return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint,
        formData);
        }

4. At this point we have added a great deal of code that isn’t yet realized in the Angular application – but the application is still functional to display the available trips. Now we need to concern ourselves with adding some visual components and refactoring the interface to provide the login capabilities we have just added. We will begin this process by creating a navigation bar component to provide access to our new login handler.
        - ng generate component navbar
  - We will need to create a template in the generated navbar.component.html file to provide our navigation bar complete with our logo and controls to display navigation as well as a login link that will toggle between login and logout based on our current state. Please Note: The angular conditional logic for the navbar items for login/logout. Additionally, the login functionality is not yet available as we haven’t built and wired up a login component yet.
        - <nav class="navbar navbar-expand navbar-light bg-light">
          <a class="navbar-brand" href="#"><img
          src="/assets/images/logo.png"></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
          <a class="nav-link active" routerLink="">Trips<span class="
          sr-only ">(current)</span></a>
          </div>
          </div>
          <div class="navbar-end ">
          <a class="nav-item" routerLink="login" *ngIf="!isLoggedIn()">
          <span class="has-icon-left">Log In</span>
          </a>
          <a class="nav-item active" (click)="onLogout()"
          *ngIf="isLoggedIn()">
          <span class="has-icon-left ">Log Out</span>
          </a>
          </div>
          </nav>
  - The navbar.component.ts file is next to adjust. This requires that we add the OnInit capability as well as our AuthenticationService. This will make the imports section of the component look like this:
        - import { Component, OnInit } from '@angular/core';
          import { CommonModule } from '@angular/common';
          import { RouterLink, RouterLinkActive } from '@angular/router';
          import { AuthenticationService } from '../services/authentication.service';
  - The body of the class is very straightforward. We need to change it to implement the OnInit interface, build a constructor to bring in our AuthenticationService and create two methods: isLoggedIn() and onLogout().
        - export class NavbarComponent implements OnInit {
          constructor(
          private authenticationService: AuthenticationService
          ) { }
          ngOnInit() { }
          public isLoggedIn(): boolean {
          return this.authenticationService.isLoggedIn();
          }
          public onLogout(): void {
          return this.authenticationService.logout();
          }
          }
5. Now is a good time to pull our new Navigation Bar into our interface and see what it looks like. In order to do that we will make a small edit to our app.component.ts file to import our new component. We can also take this opportunity to remove our TripListingComponent import and our AddTripComponent import as these components are now handled exclusively through the Angular router functionality:
![image](https://github.com/user-attachments/assets/de21acef-4469-4480-9875-069246a8e3cd)

- Nothing will happen when you save the file because we must also edit the app.component.html file and replace the static navigation bar with the Angular selector for our new navbar. This makes our primary html file very minimal as all the processing is being handled by Angular components:
    - <app-navbar></app-navbar>
      <div class="container">
      <router-outlet></router-outlet>
      </div> 
![image](https://github.com/user-attachments/assets/dfdef4b5-fdca-4609-a0ea-442cb572f507)

6. Now that we have our Navigation bar set and active, we need to add a component so that we can handle the login functionality
    - ng generate component login
  - This generates our login component and we will want to define a simple HTML template that has three textboxes and a Sign-In button. This will go in the login.component.html file. There is nothing complicated with this HTML template. Please Note: The data value bindings to the credentials object in our login.component.ts file.
    - <div class="row">
      <div class="col-12 col-md-8">
      <h2>Login</h2>
      <form (ngSubmit)="onLoginSubmit()">
      <div role="alert" *ngIf="formError" class="alert alert-danger">
      {{ formError }}
      </div>
      <div class="form-group">
      <label for="name">Name</label>
      <input type="text" name="name" placeholder="Enter Name"
      [(ngModel)]="credentials.name">
      </div>
      <div class="form-group">
      <label for="email">Email Address</label>
      <input type="email" name="email"
      placeholder="Enter email address"
      [(ngModel)]="credentials.email">
      </div>
      <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password"
      name="password" placeholder="e.g 12+ alphanumerics"
      [(ngModel)]="credentials.password">
      </div>
      <button type="submit" role="button" class="btn btn-primary">
      Sign In!
      </button>
      </form>
      </div>
      </div>
  - While the HTML template component of this is not complicated, there is some complexity to the component side of the equation. It starts with the list of imports that is required for this component:
    - import { Component, OnInit } from '@angular/core';
      import { CommonModule } from '@angular/common';
      import { FormsModule } from "@angular/forms";
      import { Router } from '@angular/router';
      import { AuthenticationService } from '../services/authentication.service';
      import { User } from '../models/user';
  - We need to add the FormsModule to be able to process the HTML form in our template. We need the Router module because we would like to redirect the user to another page after they login. We need the AuthenticationService so that we can process the user login, and we need the User object so that we have a way of manipulating the User credentials. We also need to adjust our imports statement for the FormsModule:
    - imports: [CommonModule, FormsModule ],
  - We must define some variables in our LoginComponent class:
    - public formError: string = '';
      submitted = false;
      credentials = {
      name: '',
      email: '',
      password: ''
      }
  - Our constructor will initialize both the Router capability and the AuthenticationService:
    - constructor(
      private router: Router,
      private authenticationService: AuthenticationService
      ) { }
      ngOnInit(): void {
      }
  - The first more complex method comes when the user clicks the Sign-In! button. This method first checks to make sure that there is data available for all three required parameters. If there is an error with the form, we provide an error message and navigate to the login page and the user can try again. If there is no error with the form and all three fields have data in them, we process the doLogin() method to advance the authentication process.
    - public onLoginSubmit(): void {
      this.formError = '';
      if (!this.credentials.email || !this.credentials.password ||
      !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page
      } else {
      this.doLogin();
      }
      }
  - Finally, our doLogin() method does most of the heavy lifting in this component. It takes the form data that we received from the user and builds an User object that can be used to pass to the login method from the AuthenticationService. It calls the login method, and then checks to see if the user is logged in. If so, it does a re-direct to the trip-list page. If not, it hangs out for 3 seconds and checks again in order to resolve some of the issues related to asynchronous communications over the web.
    - private doLogin(): void {
      let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
      } as User;
      // console.log('LoginComponent::doLogin');
      // console.log(this.credentials);
      this.authenticationService.login(newUser,
      this.credentials.password);
      if(this.authenticationService.isLoggedIn())
      {
      // console.log('Router::Direct');
      this.router.navigate(['']);
      } else {
      var timer = setTimeout(() => {
      if(this.authenticationService.isLoggedIn())
      {
      // console.log('Router::Pause');
      this.router.navigate(['']);
      }},3000);
      }
      }
      


7. Now that we have our login component, we need to wire up a route for the component. This requires an edit to our app.routes.ts file to both import our login component and add an applicable route.

8. At this point, provided you do not have any errors in syntax or logic, you should be able to run your application and login. You can see the ‘Log Out’ link in the navigation bar and the token in the console window courtesy of a console.log statement in the code. 


      

      
