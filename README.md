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
PORT=4000
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
Server running in development mode on port 4000
```

Open a new terminal tab and cd into ui-react. Run npm i again to download frontend dependencies

```
cd ui-react
npm i
```

While still in ui-react, `npm start` to run the project on `http://localhost:3000`

## Running the tests

There are currently no automated tests setup in this project.

### Break down into end to end tests

There are currently no e2e tests in this project

```
EXAMPLE OF COMMANDS WILL REPLACE THIS PLACEHOLDER
```

### And coding style tests

There are no coding style tests at this time.

```
EXAMPLE ADDED LATER
```

## Deployment

The backend is deployed using [Heroku](https://devcenter.heroku.com/categories/reference). Deployed api url is https://wedding-warehouse.herokuapp.com/ . The backend has been setup with CI and will build with every push to the master branch. 

The frontend is not being actively hosted at this time. I was experimenting with [Vercel's](https://vercel.com) Teams but ran out of the free trial and will not revisit hosting until the MVP has been met.

## Built With

* [Express](https://expressjs.com/) - The web framework used
* [npm](https://docs.npmjs.com/) - Dependency Management
* [React](https://reactjs.org/docs/getting-started.html) - JS Library for building the interface
* [Knex.js](http://knexjs.org/) - SQL Query builder
* [styled-components](https://styled-components.com/docs) - Uses components as a low-level styling construct

## Contributing

Please read [CONTRIBUTING.md](https://github.com/Kingdom-Software-Solutions/wedding-warehouse/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to Mel's Warehouse. You can find documentation on the endpoints and backend in the api folder in the [DOCUMENTATION.md](
https://github.com/Kingdom-Software-Solutions/wedding-warehouse/blob/master/api/DOCUMENTATION.MD) file.

## Versioning

We do not use versioning yet. 

## Authors/Contributors

* **Landon Turner** - *Initial work* 
* **[Aja Blanco](https://github.com/ajablanco)** - *Initial UX design*


## License

No license

## Acknowledgments

* None yet, hope to add some soon! 
