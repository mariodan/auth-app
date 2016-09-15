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
- set-up your environment with:
* It's good to have NODE_ENV variable set: NODE_ENV=development|production 
* node.js >=4.2.1
* nvm - Node Version Manager
* npm - Node Package Manager
* pm2 - Process monitor

How to use
----------
- TBD

How to run
-----------
- cd to project root
- run: npm install
- run either one of the followings:
 * npm start
 * node app.js
 * pm2 start --name "api" app.js


How to test
-----------
- npm test