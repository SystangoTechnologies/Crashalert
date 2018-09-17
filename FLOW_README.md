# What is RN Crash Reporter?

RN crash reporter is a software application whose function is to identify report crash details and to alert when there are runtime crashes, in production or on development / testing environments. Crash reports often include data such as stack traces, type of crash, trends and version of application.

A reporter that stores user actions step and runtime crashes info. You no longer need to change existing code, you just need to import our components in your js classes. 

### Following are the basic steps for the complete implementation of `rn-crash-reporter` :-
- Node server Installation for `rn-crash-reporter`.
- Web client Installation for `rn-crash-reporter`.
- Setup of  `rn-crash-reporter` on app. Please follow the [link here](README.md)

## Node server Installation for rn-crash-reporter

### Following steps to be followed for the Node server installation :- 
- Open your terminal and type the command `brew install docker docker-compose docker-machine xhyve docker-machine-driver-xhyve`  to install the `docker-compose` using `brew`.
- Now, type the command `brew cask install docker`
- Take clone or Download the zip file from the link [here](https://github.com/sytango-technologies/rn-crash-viewer).
- Extract the zip source file and get into the root folder of `rn-crash-viewer` on the terminal.
- Type the command `docker-compose build` and hit enter to build the image.
- Now, type the command `docker-compose up` and hit enter to aggregates the output of each container.

## Web client Installation for rn-crash-reporter

NOTE : Please ensure that the docker container is already running.

### Following steps to be followed for the Web client installation :- 
- Open the browser and type this URL  `http://localhost:8000/` in URL locator and hit enter to open the Web Client App. Please follow the[(Screenshot)](). (NOTE : You can also edit the port no in `docker-compose.yml` file in the web section.)
- You can login the app using the following credentials :-
    Username : admin@example.com
    Password : password
- On the home page, you can check the error logs recorded.  



## License

License is MIT
