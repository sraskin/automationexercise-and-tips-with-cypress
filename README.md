# Automation Exercise

- Documentation Version: 1.0
- Language: Node.js
- Tools: Cypress

## Installation

Install the following,
- Install Node.js (>16^ recommended)
- Install Docker
- Git

1. After completing the installation, clone the repository.
```sh
git clone https://github.com/sraskin/automationexercise-with-cypress.git
```
2. Fetch all the available branches.
```sh
git fetch --all
```
3. Checkout to the 'stable' branch. Because the 'master' branch will only contain stable items that are delivered or for CI pipeline. Stable branch will contain all the updated stable codes that are supposed to be going on live in the future.
```sh
git checkout stable
```
4. Attempt a pull to ensure you have up-to-date codes
```sh
git git pull origin stable
```
5. Now run,
```sh
npm install 
```
## Run the test
1. To run in interactive mode, open terminal > go to the project and type
    ```sh
    npx cypress open
    ```
    - Then choose E2E testing > Choose browser > choose the spec you wanted to run or run the entire folder
2. To run into the docker container,
   ```sh
   docker compose build
    ```
    ```sh
   docker compose up
    ```