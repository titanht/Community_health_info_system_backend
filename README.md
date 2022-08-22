## Suggested refactor fixes

- Suggest controller/service/repository pattern
  - database related code is offloaded to .repo files
  - repo orchestration logic and further data transformations should be handled by service
  - controller should parse query params or body data and call corresponding data with necessary input / output and respond with data
- stick to "skinny controllers, fat models" principle and offload most logic to services
- good practice to comment function input/output parameters for services and repositories
  (Eg. Check [Vote Repo](./repo/vote.repo.js))
- add not found error handler for non existent routes check ./server.js
- add global error handler for errors that are thrown by controller or library codes (check ./server.js)
- stick to "single responsibility", a functions description should have one statement
  Eg. VoteRepo.findVoteCountByAnswerId - returns a vote count based on given answer id if it is found
- use global error class to raise application related errors
  Eg. [ApiError](./core/api-error.js)
- refactor code inside util folder into repository files
- keep sql preparation statements inside functions instead of listing them at top
- keep file name consistent, choose one format and stick to it
  Eg. questionController(camel case) AnswerController (pascal case)
- keep related code together
  Eg. Logout.js AuthLogin.js should be in one Controller file like:
  ```
  AuthController.js
    logout: (...) => {...}
    login: (...) => {...}
    signUp: (...) => {...}
  ```

#### Optional

- Document api using Swagger, its a good practice(https://www.youtube.com/watch?v=apouPYPh_as)
- better move connect to core/db.js to clarify its functionality
- add README.md in root folder with brief description and instructions on how to run it
