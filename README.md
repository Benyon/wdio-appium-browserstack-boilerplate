# Setup and Execution

**Installation**  
To install the framework, clone the repo and `cd` into the folder and run `npm i`

**Pre-requisites**  
node (Version <14.16.1)
npm (Version <6.14.12)


**Running tests**  
If you have a look in package.json you can see theres two scripts that can be run as follows:

iOS: `npm run ios`
Android: `npm run android`

Versioning is extremely important as certain node packages are depricated and only run in lower versions of node.

**Comments**  
The reason that 'getters' are used in the screen objects files is because `driver.isAndroid()` is always falsey until the application has launched, therefore the screen object selectors always default to iOS selectors if we dont use getters.