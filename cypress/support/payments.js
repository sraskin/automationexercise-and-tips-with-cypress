/**
 * Inputs payment details and clicks the pay button.
 *
 * @param {Object} paymentDetails - The payment details to input.
 * @param {string} paymentDetails.cardholder_name - The name on the card.
 * @param {string} paymentDetails.card_number - The card number.
 * @param {string} paymentDetails.security_code - The security code (CVC) of the card.
 * @param {string} paymentDetails.expiration_month - The expiration month of the card.
 * @param {string} paymentDetails.expiration_year - The expiration year of the card.
 */

Cypress.Commands.add('inputPaymentDetailsAndPay', (paymentDetails) => {
    cy.get('[data-qa="name-on-card"]').type(paymentDetails.cardholder_name)
    cy.get('[data-qa="card-number"]').type(paymentDetails.card_number)
    cy.get('[data-qa="cvc"]').type(paymentDetails.security_code)
    cy.get('[data-qa="expiry-month"]').type(paymentDetails.expiration_month)
    cy.get('[data-qa="expiry-year"]').type(paymentDetails.expiration_year)
    cy.get('[data-qa="pay-button"]').click()
})