# Wave Software Development Challenge

**Applicant: Taha Shabani**

This repo is a payroll system for Wave HQ software development challenge. I used the followings to implement this project:

-   Language: `JavaScript`
-   Framework: `Node (Express)`
-   Database: `MySQL`

## Setup

To run the application, please follow these steps:

1. install `MySQL` in your system.

2. Open the MySQL shell using the command: `mysql -u root -p`.

3. decide the `name` for your database and `user@password` you want to use to access it.

-   Create the dataset with this command: `CREATE DATABASE <database_name>`

4. Create a `.env` file and store your credentials. for further details, please look into `.env-copy` file to understand what parameters you need to provide.

5. Open your project with your terminal and install dependencies: `npm install`

6. Run your application using `npm run start` or in Dev mode using `npm run dev`. If you are running in Dev mode, ensure you have `nodemon` installed.

7. Once it's run, 3 new tables will be created for your database and the server will run on http://localhost:8080.

## APIs

The API for uploading a CSV file:

```bash
POST http://localhost:8080/api/upload?file=<MultipartFile>
```

The API for getting a report (with the required format):

```bash
GET http://localhost:8080/api/report
```

## Questions

#### How did you test that your implementation was correct?

I tested the implementation using both correct and incorrect cases to verify correctness and error handling (functional testing). Specifically:

-   I used cURL and Postman to test the APIs by sending different HTTP requests and verifying responses.

-   I conducted unit tests for utility functions to ensure their correctness and edge case handling.

-   I checked error handling mechanisms to confirm that invalid inputs were properly caught and returned appropriate error responses.

#### If this application was destined for a production environment, what would you add or change?

For the production environment, I would consider the following improvements:

-   `Database optimization`: Providing query optimization and security concerns such as preventing SQL injection would improve the interactions with the database.
-   `Scalability`: I would suggest using cloud systems (including AWS, Azure, etc.) for a more scalable infrastructure. Furthermore, using a load balancer is essential. Message queues (for instance: Kafka) can also help improve the efficiency of background tasks.
-   `Testing`: Expanding the unit tests, as well as integration testing and E2E testing (for both the Backend and Frontend sides).
-   `CI/CD automation`: Automating CI/CD pipelines using Docker (or containerd), Jenkins, and Kubernetes.
-   `Monitoring tools`: such as Elastic/Kibana and Grafana can help to check the performance and detect anomalies continuously.
-   `API development and documentation`: using swagger or openAPI to document the APIs, use-cases, etc.

#### What compromises did you have to make as a result of the time constraints of this challenge?

Based on the limited time for this challenge, I believe `limited test scope` is one of the compromises. Although I provided a few tests to check the utils functions, I did not create comprehensive integration tests covering all edge cases.

In addition, an `authentication/authorization system` is required to check users, their API access, and credentials.

`file handling` can also be optimized, as we store the big chunks of data within decentralized or cloud storage for efficiency.

`entities, DTOs, and database tables` can also be improved, as an example, we can add a currency field to the database to cover different types of currencies (such as USD, EURO, etc)

Last but not least, according to the time constraints, I was not able to create a basic `React` app for the frontend and integrate it with the current backend system.
