MyAuth APP v1.0
===============

Repo: https://github.com/mariodan/auth-app

Scope
----------
- Should be a Node.js app with Express.js as framework;
- Should be tested with ChaiJS;
- Should be able to login/logout and edit the user information (first and last name, mail address and password);
- Should be able to create subscriptions (product name, price, create at, last updated, status);
- Should be able to edit subscriptions;
- Should be able to view a list of my subscriptions;
- Should be able to switch the status of my subscriptions (active/inactive);
 
- Everything should be done over AJAX except deleting my subscription;
- Deleting a subscription should be done in SOAP (you'll need a small SOAP server and client);
- Use sqlite as a DB.


Env requirements
----------
- install low-level system SQLite libraries: sudo apt-get install sqlite3
- install global mocha: npm install mocha -g
- set-up your environment with:
* node.js >=4.2.1
* nvm - Node Version Manager
* npm - Node Package Manager
* pm2 - Process monitor


API REST Endpoints
------------------
- REST endpoints testing tool: Chrome Postman

* GET /v1/api/session - retrieves info about the current user session
* POST /v1/api/session - logs user is by creating a new session
request.body:
```JSON
{
	"email": "admin@mydomain.com",
	"password": "secret#123"
}
```
* DELETE /v1/api/session - logs user out by deleting the session
* GET /v1/api/users/1 - retrieves details about user by id
* GET /v1/api/users - get the list of all users
* PUT /v1/api/users/1 - update user by id
request.body:
```JSON
{
	"email": "admin@mydomain.com",
	"firstName": "Admin",
	"lastName": "Smith",
	"passwordHash": "secret#123"
}
```
* POST /v1/api/users - creates a new user
request.body:
```JSON
{
	"email": "admin111@mydomain.com",
	"firstName": "Admin1",
	"lastName": "Smith1",
	"passwordHash": "secret#1234"
}
```
* DELETE /v1/api/users/20 - delete user by id


SOAP Server
-----------
- WSDL: http://localhost:1337/subscriptionService?wsdl

SOAP Client
-----------
```HTML
<html>
	<title>soap</title>
	<link rel='stylesheet' type='text/css' href='main.css' />
	<!-- jquery from cdn at (mt) Media Temple -->
	<script type='text/javascript' src='http://code.jquery.com/jquery-1.10.2.js'></script>
	<script type='text/javascript' src='jquery.soap.js'></script>
<body>
	<p>soap</p>

	<script>
		$.soap({
		    url: 'http://localhost:1337/subscriptionService/',
		    method: 'deleteSubscription',

		    data: {
		    	id: 4
		    },

		    success: function (soapResponse) {
		        console.log(soapResponse)
		    },
		    error: function (SOAPResponse) {
		        console.log(SOAPResponse)
		    }
		});
	</script>
</body>
</html> 
```


How to run
-----------
- cd to project root
- run: **npm install** * (this process will take a while) *
- run either one of the followings:
 * npm start
 * node app.js
 * pm2 start --name "api" app.js


How to test
-----------
*test should be run when the app is stopped, otherwise an* **Error: listen EADDRINUSE** *will be displayed*
- npm test

- Output:

```
  REST API test
    ✓ should login an existing user
    ✓ should get a list of existing users
    ✓ should get a user by id
    ✓ should add a new user
    ✓ should delete a new user

  Database
    ✓ should have a valid DB instance

  Models
    ✓ should have users in table
    ✓ should get a user details
    ✓ should add a new user
    ✓ should delete a new user


  10 passing (118ms)
```


TODO
---------
- fix bugs
- write more tests
- documentation (e.g. apidoc)
- refactor
- refactor
- refactor