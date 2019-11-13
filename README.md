![puppteer logo](https://developers.google.com/web/tools/images/puppeteer.png)
# puppeteerFirebaseSuite

<a href="https://codeclimate.com/github/evilUrge/puppeteerFirebaseSuite/maintainability"><img src="https://api.codeclimate.com/v1/badges/8fe3ed510d9a495d7cad/maintainability" /></a>

Run your Puppeteer test suite as a Firebase Function.

The following is included an easy to extend base and an example test.

Prerequisites:
-------------
* Node 8
* Firebase project


What and where to extend?
-------------
* `src/constant` - Add all of your constant and conf and css-selectors.
* `src/utils` - Add all methods that your planning to reuse (_example:login method_).


Debug locally
-------------
Run index.js with the env param `NODE_ENV=DEV` to run the server locally.


> I've included an example test called ducksearch with a pretty basic functionality:
https://europe-west1-puppeteerfirebasesuite.cloudfunctions.net/puppeteer/v1/ducksearch?query=hummus&result=3



###### Before you deploy Make sure you modified `.firebaserc` to include your fb project name. 


