/*
* TODO:
9. Fill all details in Sign up and create account
10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
11. Verify ' Logged in as username' at top
12.Click 'Cart' button
13. Click 'Proceed To Checkout' button
14. Verify Address Details and Review Your Order
15. Enter description in comment text area and click 'Place Order'
16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
17. Click 'Pay and Confirm Order' button
18. Verify the success message 'Your order has been placed successfully!'
*/
import user_data from '../fixtures/user_data'
const base_url = Cypress.env('base_url')
describe('Add a product and complete the purchase', () => {
  it('Should visit the URL, add a product to the cart', () => {
    cy.visit(base_url)
    //Verify that home page is visible successfully
    cy.url().should('include', base_url)
    cy.get('.features_items').should('be.visible')
    //Get the first product and click on Add to cart
    cy.get('.product-image-wrapper').then(($items) => {
      cy.wrap($items[0]).contains('Add to cart').click()
    })
    //Wait to show the product added to the cart modal
    cy.wait(500)
    //Click on Continue Shopping to close the modal
    cy.contains('Continue Shopping').click()
    //Wait to close the modal and click on Cart
    cy.wait(500)
    cy.contains('Cart').click()
    //Verify that cart page is displayed
    cy.url().should('include', base_url + '/view_cart')
    cy.get('#cart_info').should('be.visible')
    //Click Proceed To Checkout
    cy.contains('Proceed To Checkout').click()
    //Go to Register/Login page and complete the registration
    cy.get('.modal-body').should('be.visible')
    cy.get('.modal-body').find('a').click()
    //fill out the form and submit
    cy.get('[data-qa="signup-name"]').type(user_data.user_1.user_full_name)
    cy.get('[data-qa="signup-email"]').type(user_data.user_1.user_email)
    cy.get('[data-qa="signup-button"]').click()
  })
})
