# Calculus API

Performs calculus operations for base64 encoded string.
This simple web service to implement a calculator. The service offers an endpoint that reads a string input and parses it.
It returns either an HTTP error code, or a solution to the calculation in JSON form. Furthermore,
the service  offer the possibility to return the last 5 calculations with their results.
Supported mathematical symbols are `+, -, *, /, (, )`

An example calculus query:
```
query: 2 * (23/(3*3))- 23 * (2*3)
encoded: MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=
```

You might be wondering, `Why such a detailed design for a small project?` 
Well, I wanted to give you a good look at how I work in software development, 
beyond just solving the immediate task. Let's keep in mind, we're all constantly learning! I'd really appreciate 
any thoughts or feedback on this project. It's a fantastic way to learn from each other and keep getting better!. I know 
there is still something need to be done, but I think it is enough.

## Requirements

- Docker

## Installation & Running the Application

To run the application, make sure you have Docker installed to avoid any database connection issues. Then, follow these steps:
- Clone the repository:

   ```bash
   $ git clone https://github.com/narayanghimire/calculator-nest-js
- Navigate to the project directory::
   ```bash
   $ cd calculator-api
- Build and run the Docker containers:
   ```bash
   $ docker-compose up --build -d


## Test
   ```bash
## Unit Test
   $ docker-compose run calculator npm run test
## Integration Test:
   $ docker-compose run calculator npm run test:e2e
   ```
### Endpoint: GET /calculus

##### Request

   ```bash
GET /calculus?query=MiAqICgyMy8oMyozKSktIDIvMg== HTTP/1.1
Host: localhost:8000
x-client: test-client
   ```

`query`: Base64 encoded string for calculus operation.

##### Response
   ```bash
- Success: `{ "error": false, "result": number }`
- Error:  `{ "error": true, "message": "string" }`  with specific HTTP status code
   ```

### Endpoint: GET /calculus/history

Retrieves the last 5 records of calculus operations.

##### Request

   ```bash
GET /calculus/history HTTP/1.1
Host: localhost:8000
x-client: test-client(you have to use this as HTTP request header key & value)
   ```
##### Response
   ```bash
- Success: `{ "query": string, "result": number }`
- Error:  `{ "error": true, "message": "string" }`  with specific HTTP status code
   ```

# Deployment Strategy

## Quick Overview

Hey there! So, I've set up a neat little system using GitHub Actions workflows for this project. The goal? To automate
testing and send the project sailing smoothly onto Google Cloud.

## The Flow of Things

1. **Feature Branch:** When a pull request pops up, it triggers a build of feature branch. We run unit tests here,
   aiming to get rapid feedback. Speed is key at this stage!

2. **Code Review and Merging:** After the feature branch passes its tests and gets the thumbs up on code review,
   we merge it with the main branch.

3. **Main Branch Testing and Deployment:** Now, it's the main branch's turn to shine. 
   We perform integration tests in this phase. If everything goes smoothly, 
   we package everything into a Docker container and deploy it to a cloud provider or any other platform,
    or on the stage or your specific requirements.

There is a workflow for testing and features located in the .github/workflows directory."
