# Automation Exercise

- Documentation Version: 1.0
- Language: Node.js
- Tools: Cypress

## Description
This is demo automation project using Cypress. In this project I have used http://automationexercise.com site to automate the test case. I have completed below steps on this project,
1. Launch browser(Chrome/Firefox)
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Add products to cart
5. Click 'Cart' button
6. Verify that cart page is displayed
7. Click Proceed To Checkout
8. Click 'Register / Login' button
9. Fill all details in Sign up and create account
10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
11. Verify 'Logged in as username' at top
12. Click 'Cart' button
13. Click 'Proceed To Checkout' button
14. Verify Address Details and Review Your Order
15. Enter description in comment text area and click 'Place Order'
16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
17. Click 'Pay and Confirm Order' button
18. Verify the success message 'Your order has been placed successfully!'

I followed a recommended design pattern for this project. 
- I have used Page Object Model (POM) design pattern (in reusable commands) 
  - [ In Cypress we do not have to use the object-oriented PageObject implementation. We can also move typical logic into reusable Cypress Custom Commands that do not have any internal state and just allow us to reuse code. ]
- I have created a separate file for each test case. 
- I have used Cypress fixtures to store the test data. 
- I have used Cypress commands to create custom commands. 
- I have used Cypress environment variables to store the environment variables. 
- I have used a Cypress Mochawesome reporter to generate the report.


## Installation

Install the following.
- Install Node.js >16^ recommended 
- Install Docker (Optional: If you want to run the test in docker container)
- Git

1. After completing the installation, clone the repository.
```sh
git clone https://github.com/sraskin/automationexercise-with-cypress.git
```
2. Verify that you are in the master branch.

3. Then run,
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