# ChicosSass

# DO NOT MODIFY THE BELOW FILES
## Required by AWS CodeDeploy to push changes to EC2 instances.
## For questions ask Nick Alteen.
* ./appspec.yml
* ./scripts/removefiles
* ./scripts/startwatch

---

# Grunt
This project uses Grunt to compile Jekyll and SCSS code. Grunt is a task runner that automates a lot of the command line tasks we used to do. If needed, we can also concatentate and minify JS, but that's not necessary at this time.

## Install Grunt
Node is required to use Grunt. Simply download and install it from the [Node website](https://nodejs.org/en/) if you don't already have it. 

Grunt is easy to install, but you'll need to make sure your computer Please [follow the instructions on this page](http://gruntjs.com/getting-started),

## Set Up Your Chicos Project
Once Grunt is installed, use Terminal or Command Prompt to navigate to the Chicos project folder on your hard drive. This is the folder that contains Gruntfile.js and package.json. Here's an example of that command.

```
cd /path/to/chicos/folder
```

Next, install Grunt for the Chicos project.

```
npm install
```

Finally, you'll need to tell Grunt to watch for changes in your Chicos folder.

```
grunt serve --watch
```

You're all set. Please note that you'll need to CD to your directory and run the grunt command each time you start a new session. You will only run the install command line the first time you set up your project.