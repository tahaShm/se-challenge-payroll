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



#### If this application was destined for a production environment, what would you add or change?



#### What compromises did you have to make as a result of the time constraints of this challenge?


