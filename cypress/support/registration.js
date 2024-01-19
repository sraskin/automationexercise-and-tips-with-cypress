const baseUrl = Cypress.env('base_url')

/**
 * Registers a new user.
 *
 * @param {string} fullName - The full name of the user.
 * @param {string} email - The email address of the user.
 */
Cypress.Commands.add('registration', (fullName, email) => {
    cy.get('[data-qa="signup-name"]').type(fullName)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
})

/**
 * Completes the registration process for a new user.
 *
 * @param {Object} userDetails - The details of the user to register.
 * @param {string} userDetails.salutation - The salutation of the user (e.g., 'Mr.', 'Mrs.').
 * @param {string} userDetails.user_password - The password of the user.
 * @param {string} userDetails.date_of_birth - The date of birth of the user, in the format 'dd/mm/yyyy'.
 * @param {string} userDetails.first_name - The first name of the user.
 * @param {string} userDetails.last_name - The last name of the user.
 * @param {string} userDetails.address - The address of the user.
 * @param {string} userDetails.country - The country of the user.
 * @param {string} userDetails.state - The state of the user.
 * @param {string} userDetails.city - The city of the user.
 * @param {string} userDetails.zip_code - The zip code of the user.
 * @param {string} userDetails.mobile - The mobile number of the user.
 */
Cypress.Commands.add('completeRegistration', (userDetails) => {
    if (userDetails.salutation === 'Mr.') {
        cy.get('#id_gender1').check()
    } else if (userDetails.salutation === 'Mrs.') {
        cy.get('#id_gender2').check()
    }
    cy.get('[data-qa="password"]').type(userDetails.user_password)
    
    //choose DOB from dropdown
    const dobSplit = userDetails.date_of_birth.split('/')
    cy.get('[data-qa="days"]').select(dobSplit[0])
    cy.get('[data-qa="months"]').select(dobSplit[1])
    cy.get('[data-qa="years"]').select(dobSplit[2])
    
    //fill out the name
    cy.get('[data-qa="first_name"]').type(userDetails.first_name)
    cy.get('[data-qa="last_name"]').type(userDetails.last_name)
   
    //fill out the address
    cy.get('[data-qa="address"]').type(userDetails.address)
    cy.get('[data-qa="country"]').select(userDetails.country)
    cy.get('[data-qa="state"]').type(userDetails.state)
    cy.get('[data-qa="city"]').type(userDetails.city)
    cy.get('[data-qa="zipcode"]').type(userDetails.zip_code)
    cy.get('[data-qa="mobile_number"]').type(userDetails.mobile)
    
    //complete the registration
    cy.get('[data-qa="create-account"]').click()

    //Verify that the user is logged in successfully
    cy.url().should('include', baseUrl + '/account_created')
    cy.get('#form').should('be.visible')
    cy.contains('Account Created!').should('be.visible')

    //Click on Continue
    cy.contains('Continue').click()
})