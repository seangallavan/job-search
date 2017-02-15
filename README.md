# Job Search Application

This is an application I quickly put together to learn Angular2, TypeScript and the Loopback.io platform. It is backed
by a MongoDB datastore. It uses one set of models for both client and server and automatically generates appropriate
api access services. It is not production code, but rather a rapid prototype (no unit tests, etc. yet).

## Setup

MongoDB setting can be changed in the server/datasources.json file.
Server port settings can be changed in server/config.json
Most other setting should be fine for testing.

## Running the Server

To run the server, from the main directory type 'node .'

## Running the Client

To run the client go to the client directory and type 'ng serve' (add a -H 0.0.0.0 to view on other machines).

## Building Isomorphic Client Models

From the main directory, type 'npm run build:sdk'

## Editing Isomorphic Models
Models are stored in the common/models directory. After editing, you will need to restart the server and generate new
client models.