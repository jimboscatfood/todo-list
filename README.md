# todo-list
A repo for Odin Project - Project: Todo List

This is a project to tie the techqiues of module pattern, package manager, and creating different configurations for production and development 

Set up:
1. Add a .gitignore file to ignore node_module and dist
2. Create a package.json for storing package info for the project
3. Create the src dir for writing code and dist for storing code to be bundled (by webpack)
4. Install bundler (webpack) and create a config file each for common, prodution and development
5. Create the entry point index.js for modules to be imported
6. Start coding in the src folder, note that todos elements should be added dynamically by js

DOM logic:
1. Set up separate modules for handling different part of application logic,
for example, a module is set for manipulating todo item info and another should be set up 
for manipulating DOM


Module logic:
1. Draw up the basic architecture of the webpage:
    One webpage: index.js
    Three parts of layout: header, sidebar, dashboard
    Two components to be generated dynamically: New project in sidebar, todo items in dashboard