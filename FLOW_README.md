
# Following are the basic steps for the complete implementation of `Crashlyzer` :

- Node server Installation for `Crashlyzer`.
- Web client Installation for `Crashlyzer`.
- Setup of  `rn-crash-reporter` on app. Please follow the [link here](README.md)

## Node server Installation for Crashlyzer

### Following steps to be followed for the Node server installation using docker container:- 
- Open your terminal and run the following command (assuming you have already installed the `brew`)
        $ `brew install docker docker-compose docker-machine xhyve docker-machine-driver-xhyve`
        $ `brew cask install docker`
- Take clone or Download the zip file from the link [here](https://github.com/sytango-technologies/rn-crash-viewer).
- Extract the zip source file and get into the root folder of `Crashlyzer` on the terminal.
- Now run the command 
        $ `docker-compose up`

## Web client Installation for Crashlyzer

NOTE : Please ensure that the docker container is already running(by the command `docker-compose up` ) and whenever you restarts your PC, you need to run the command `docker-compose up` to start your container. 

### Following steps to be followed for the Web client installation : 
- Open the browser and type this URL  `http://localhost:8000/` in URL locator and hit enter to open the Web Client App. Please follow the[(Screenshot)](WebClient.png). (NOTE : You can also edit the port no in `docker-compose.yml` file in the web section.)
- You can login the app using the following credentials :
        
**Username** : admin@example.com
**Password** : password

- On the home page, you can check the error logs recorded. Please follow the[(Screenshot)](Error_Logs.png).

### You can also perform the addtional operations on the web app as follows :
- You can check the details of error. Please follow the[(Screenshot)](Details.png).
- You can mark the error is resolved on the Action panel. Please follow the[(Screenshot)](Reopen_Error.png).
- You can also reopen the error on the Action panel. Please follow the[(Screenshot)](Resolved_Error.png).


## License

License is MIT
