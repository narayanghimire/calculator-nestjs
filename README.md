# Calculator API 

Hi there! I've made this small demo project using TypeScript and Nestjs. 
The idea? To let you see how I tackle problems and plan out my work.

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
## Calculus API

Performs calculus operations for base64 encoded string.

### Endpoint: GET /calculus

##### Request

   ```bash
GET /calculus?query=MiAqICgyMy8oMyozKSktIDIvMg== HTTP/1.1
Host: localhost:8001
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
Host: localhost:8001
x-client: test-client
   ```

##### Response
- Success: An array of the last 5 records, each being an object of the form


   ```bash
- Success: `{ "query": false, "result": number }`
- Error:  `{ "error": true, "message": "string" }`  with specific HTTP status code
   ```
