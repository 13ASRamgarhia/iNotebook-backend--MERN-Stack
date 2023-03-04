# iNotebook

### Getting Started

**App Link**: https://inotebook-cloud-notebook-app.netlify.app/

**iNotebook** is a React app which is developed using MERN Technologies. This is a cloud notebook app, which can be accessed by a device with internet connection. User needs to register in order start accessing the notes. Once user is registered, he/she can just login to his/her notebook and start writing. This app is using MongoDB to store the user data and their notes. User can add a new note and delete a note. For now, edit note functionality is not implemented in the app, that will be in future versions of the app.

**This is backend for the iNotebook app. Please follow the following link for frontend for the app - [iNotebook frontend](https://github.com/13ASRamgarhia/iNotebook-frontend--MERN-Stack)**\
**CONTACT:** Feel free to contact on LinkedIn in case of any queries - [LinkedIn profile](https://www.linkedin.com/in/13asr/)

### Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Nodemon is used to run the app in development mode.\
In order to run the app on your local machine, you need to add PORT env. Just add a file CONFIG.env in the same directory as server.js file and add `PORT=<Your port here>`. Now type `npm start` and hit enter to start the app.

The app will restart everytime you make changes.\
You may also see any lint errors in the console.

### Technologies used

THE APP IS DEVELOPED USING MERN TECHNOLOGIES.

> `Core Node.js` is used to design backend for the app.

> `nodemon` is used for running the app in developement mode.

> This app used `mongoose` to connect the backend server with Mongo DB.

> To implement the login/logout functionality, `jsonwebtoken` is used to create the token for user login.

> `express` is used for implementing the functionalities in the backend server.

> `dotenv` is used for storing and accessing the environment variables in the app.

> `cors` is used to allow the user to send API requests from the deployed app.

> Password for all the users is hashed, this is implemented using `bcypt`

> `axios` is used to handle the API requests.

### Steps to run the app

Anyone can use the app by clicking on the link provided at the top of this documentary.
If one wants to run backend server for developement purpose, he can freely download the source code and start the development.

PRE-REQUISITE: VS Code, Node.js and proficiency in MERN Technologies

Note: If you recently installed Node.js, I would recommend you to restart your pc.

After downloading the app, open it in VS Code and type `npm install` in in-built cmd. This will install all necessary dependencies to run the app.
Once all dependecies are installed, run start command `npm start` to run app in development mode.


