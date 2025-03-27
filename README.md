# TSE API Tutorial

This repository contains a shorter version of the API tutorial available on the documentation site.  It's been simplified a bit to highlight the user of the APIs for Python and TypeScript while covering most of the same topics.

# Assumptions

This course assumes you are generally familiar with web technologies and programming.  The exercises will be done in Python and Typescript.  You don't have to be proficient in these languages, but should be able to code in some sort of structural language.  You should also be comfortable editing code and running scripts at the command line.

# System Requirements

For these exercises, you will need a computer with the following:

* Command line tool, such as Terminal or Powershell where you can run commands.
* An IDE that supports Python and Typescript.  [Visual Studio Code](https://code.visualstudio.com/) is available for most platforms for free.
* Python 3.8+ installed.  Run `python --version` to verify.
* NPM v10+ installed and executable from the command line.  Run `npm --version` to verify.
* Node v23+ installed and executable from the command line.  Run `node --version` to verify.

# Setup Instructions

## Python

To set up for the Python exercises, do the following:  

1. Create a new directory in your file system.
2. Create a virtual environment in the new directory either using an IDE or command line, e.g. `python -m venv ./venv` 
3. Activate the environment based on your OS.
4. Copy the Pyhon files to your folder: get_sql_from_liveboard.py and requirements.txt  
5. Run `pip install -r requirements.txt`
6. Run `python get_sql_from_liveboard.py` to verify it runs. 

NOTE: if you need help setting up a virtual environment, see the [documentation](https://docs.python.org/3/library/venv.html).

## Typescript

To set up for the Typescript exercises, do the following:  

1. Create a new directory in your file system, api-sdk.
2. Download/copy the files from the Typescript/ folder (get_permissions.ts, etc.) to the new folder.
3. Using the command line, run the command `npm install`.  You should see multiple packages successfully install and receive a message like the following:  `added 354 packages, and audited 355 packages in 16s`.
4. Test by running `npm start`.  You should see successful execution.
