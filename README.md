<a href="https://codeclimate.com/repos/5f03fbd4b3de29018b00b6c5/maintainability"><img src="https://api.codeclimate.com/v1/badges/f912fe0217a0608c38fc/maintainability" /></a>
# Mel's Wedding Warehouse

This project is a wedding rental web app built in React and Express.js and it all lives here in this monorepo. This project is for, and inspired by my wife Melanie, who has started pursuing her dream to be a wedding planner. She knew how emotionally and financially overwhelming it can be to put on a wedding, whether you are the planner or the bride planning herself. In response, she had the idea that, as she would buy things for the weddings she planned, she could keep those items and rent them out to other planners to help trim the financial burden a wedding can bring. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project uses npm as package manager and was built using Node.js. You will need to install Node.js, npm and have your favorite IDE handy. (#VSCode GANG)

To check if you have node installed, run this in your terminal:
```
node -v
```
To confirm you have npm installed correctly, run this command:
```
npm -v
```

### Installing

A step by step series of examples that tell you how to get a development env running


Clone the monorepo to your local machine using your terminal

```
git clone <this repo>
```

Add a `.env` file to the base directory *AND* another `.env` file in the ui-react folder.
Please ensure you have these environment variables to get started, the project will not work locally without them.
ESPECIALLY the `NODE_ENV` and `REACT_APP_BASE_URL`

In the base directory, `wedding-warehouse`:
```
NODE_ENV=development
PORT=5000
OKTA_TOKEN=<SEE ADMIN>
OKTA_DOMAIN=<SEE ADMIN>
ACCESS_ORIGIN=http://localhost:3000
```
In the `ui-react` directory:
```
REACT_APP_BASE_URL=development
REACT_APP_OKTA_CLIENT_ID=<SEE ADMIN>
REACT_APP_OKTA_DOMAIN=<SEE ADMIN>
```

Run an npm install in the base directory `wedding-warehouse` to download dependencies

```
npm i
```

Open a new terminal tab and run `npm run server` in the base directory to start the local server. Should run nodemon as shown below.

```
npm run server

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
Server running in development mode on port 5000
```

Open a new terminal tab and cd into ui-react. Run npm i again to download frontend dependencies

```
cd ui-react
npm i
```

While still in ui-react, `npm start` to run the project on `http://localhost:3000`


End with an example of getting some data out of the system or using it for a little demo
```
EXAMPLE TO BE ADDED LATER
```

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
