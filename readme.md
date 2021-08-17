## :shield: Introduction 
Kerberos is a computer network security protocol that authenticates service requests between two
or more trusted hosts across an untrusted network, like the internet. It uses secret-key
cryptography and a trusted third party for authenticating client-server applications and verifying
users' identities.

![alt text](https://www.linkpicture.com/q/Screenshot-from-2021-08-05-19-23-46.png)

### Some Information about the project:
1. The following project is a prototype authentication model that uses hashing algorithm known as SHA256 to hash the password. 
2. I have use json file to store users data locally using node file handling methods. 
3. The project also has the feature to see the data stored in a table form. 
4. Please note that the project is a simulation of how kerberos system works and is only for education puposes. 

### :gear: How to run locally on your machine
There are two ways to run the application locally on your machine. The instructions are
described below based on the presumption that the user has an idea about setting up global env
and installing packages.
#### Using Dependencies and Packages
1. Install nodejs and npm packages on your machine in a global environment.
https://nodejs.org/en/download/
2. Once you installed the packages on your, open command prompt and check if the
command npm is on your global environment (only for windows users).
npm --version
npde --version
3. If not, then set up the npm on your global environment from the control panel. (only for
windows users).
4. Once you do that, make sure you also install concurrently on your global environment. (only for window users) https://www.npmjs.com/package/concurrently
5. Git clone the repository from https://github.com/Prajeet-Shrestha/kerberos-authentication-system.git
6. Once you are done with the step, open your terminal/command prompt, and type npm install
7. Once the dependencies are installed you can run the application using npm run start
8. You can find the application hosting on your http://localhost:3000/

#### Using Docker
1. Install docker
a. For window user, you can download the .msi from
https://docs.docker.com/get-docker/
b. For Linux user, you can get it from sudo apt install docker.io
2. Git clone the repository from https://github.com/Prajeet-Shrestha/kerberos-authentication-system.git
3. You can install dependencies if you want to , open your terminal/command prompt, and type npm install
4. Get inside the folder with terminal and
  a. enter the command (for Linux)
      sudo docker build -t kerberos .
      sudo docker run it -p 6000:3000 kerberos
  b. enter the command (for win)
      docker build -t kerberos .
      docker run it -p 6000:3000 kerberos
5. You can find the application hosting on your http://localhost:3000/ or http://localhost:6000/

## Created & designed by Prajeet Shrestha
### Computer Science Batch 2017 
#### prajeet.shrestha.biz@gmail.com 
##### 9810442111
