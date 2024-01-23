/*
This script will complete the following steps:
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Add products to cart
5. Click 'Cart' button
6. Verify that cart page is displayed
7. Click Proceed To Checkout
8. Click 'Register / Login' button
9. Fill all details in Sign up and create account
10. Verify 'ACCOUNT CREATED!' And click 'Continue' button
11. Verify 'Logged in as username' at top
12.Click 'Cart' button
13. Click 'Proceed To Checkout' button
14. Verify Address Details and Review Your Order
15. Enter description in comment text area and click 'Place Order'
16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
17. Click 'Pay and Confirm Order' button
18. Verify the success message 'Your order has been placed successfully!'
 */

import randomGenerator from '../fixtures/random_generator'
import ProductPage from '../pageObjects/productPage'

const baseUrl = Cypress.env('baseUrl')
const randomString = randomGenerator.random_string(30)
const randomNumber = randomGenerator.random_number(5)

describe('Add a product and complete the purchase', () => {
    beforeEach(() => {
        cy.fixture('user_data').as('userData')
        cy.fixture('payment_data').as('paymentData')
    })
    it('Should visit the URL, add a product to the cart', function () {
        const productPage = new ProductPage()
        cy.visit(baseUrl)
        //Verify that home page is visible successfully
        cy.url().should('include', baseUrl)
        cy.get('.features_items').should('be.visible')

        //Add first product to cart
        productPage.addProductToCart(0)
        //Wait to show the product added to the cart modal
        cy.wait(500)
        //Click on Continue Shopping to close the modal
        cy.contains('Continue Shopping').click()
        //Wait to close the modal and click on Cart
        cy.wait(500)
        cy.contains('Cart').click()
        //Verify that cart page is displayed
        cy.url().should('include', baseUrl + '/view_cart')
        cy.get('#cart_info').should('be.visible')

        //get the product name, price and quantity from product-1 and save them to a variable
        cy.get('#product-1').then(($product) => {
            const productName = $product.find('.cart_description').find('a').text()
            const productPrice = $product.find('.cart_price').find('p').text()
            const productQuantity = $product.find('.cart_quantity').find('button').text()
            cy.wrap(productName).as('productName')
            cy.wrap(productPrice).as('productPrice')
            cy.wrap(productQuantity).as('productQuantity')
        })

        //Click Proceed To Checkout
        cy.contains('Proceed To Checkout').click()
        //Go to Register/Login page and complete the registration
        cy.get('.modal-body').should('be.visible')
        cy.get('.modal-body').find('a').click()

        //fill out the form and submit
        // I have generated a random email address to avoid the error message 'Email already exists'
        cy.registration(this.userData.user_1.user_full_name, `test_email_${randomNumber}@johndoe.com`)

        //fill out the additional details
        cy.completeRegistration(this.userData.user_1)

        //Wait for the new page to load and verify that the username is displayed
        cy.wait(1000)
        cy.contains(`Logged in as ${this.userData.user_1.user_full_name}`).should('be.visible')
        //Click on Cart and proceed to checkout
        cy.contains('Cart').click()
        cy.url().should('include', baseUrl + '/view_cart')
        cy.get('#cart_info').should('be.visible')
        cy.contains('Proceed To Checkout').click()

        //verify that the address details are displayed
        cy.get('#address_delivery').should('be.visible')
        cy.get('#address_delivery').find('.address_firstname').should('have.text', `${this.userData.user_1.salutation} ${this.userData.user_1.user_full_name}`)
        cy.get('#address_delivery').find('.address_address1').should('have.text', this.userData.user_1.address)
        cy.get('#address_delivery').then(($el) => {
            let text = $el.find('.address_city').text();
            text = text.replace(/[\n\t]/g, '').replace(/(\d+)/, ' $1')
            expect(text).to.equal(`${this.userData.user_1.city} ${this.userData.user_1.state} ${this.userData.user_1.zip_code}`)
        });
        cy.get('#address_delivery').find('.address_country_name').should('have.text', this.userData.user_1.country)
        cy.get('#address_delivery').find('.address_phone').should('have.text', this.userData.user_1.mobile)

        //Review the order
        cy.get('#product-1').then(function ($product) {
            const productName = $product.find('.cart_description').find('a').text()
            const productPrice = $product.find('.cart_price').find('p').text()
            const productQuantity = $product.find('.cart_quantity').find('button').text()
            expect(productName).to.equal(this.productName)
            expect(productPrice).to.equal(this.productPrice)
            expect(productQuantity).to.equal(this.productQuantity)
        })

        //Enter description in comment text area and click 'Place Order'
        cy.get('.form-control').type(randomString)
        cy.contains('Place Order').click()

        //Input payment details and click 'Pay'
        cy.inputPaymentDetailsAndPay(this.paymentData.payment_1)

        //Verify that payment is successful
        cy.url().should('include', baseUrl + '/payment_done')
        cy.get('#form').should('be.visible')
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
        cy.contains('Continue').click()
    })
})
