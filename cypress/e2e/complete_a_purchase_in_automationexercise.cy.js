import userData from '../fixtures/user_data'
import randomGenerator from '../fixtures/random_generator'
import paymentData from '../fixtures/payment_data'

const baseUrl = Cypress.env('base_url')
const randomString = randomGenerator.random_string(30)
const randomNumber = randomGenerator.random_number(5)

describe('Add a product and complete the purchase', () => {
    it('Should visit the URL, add a product to the cart', function () {
        cy.visit(baseUrl)
        //Verify that home page is visible successfully
        cy.url().should('include', baseUrl)
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
        cy.get('[data-qa="signup-name"]').type(userData.user_1.user_full_name)
        cy.get('[data-qa="signup-email"]').type(`test_emai_${randomNumber}@johndoe.com`)
        cy.get('[data-qa="signup-button"]').click()

        //fill out the additional details
        if (userData.user_1.salutation === 'Mr.') {
            cy.get('#id_gender1').check()
        } else if (userData.user_1.salutation === 'Mrs.') {
            cy.get('#id_gender2').check()
        }
        cy.get('[data-qa="password"]').type(userData.user_1.user_password)
        //choose DOB from dropdown
        const dobSplit = userData.user_1.date_of_birth.split('/')
        cy.get('[data-qa="days"]').select(dobSplit[0])
        cy.get('[data-qa="months"]').select(dobSplit[1])
        cy.get('[data-qa="years"]').select(dobSplit[2])
        //fill out the name
        cy.get('[data-qa="first_name"]').type(userData.user_1.first_name)
        cy.get('[data-qa="last_name"]').type(userData.user_1.last_name)
        //fill out the address
        cy.get('[data-qa="address"]').type(userData.user_1.address)
        cy.get('[data-qa="country"]').select(userData.user_1.country)
        cy.get('[data-qa="state"]').type(userData.user_1.state)
        cy.get('[data-qa="city"]').type(userData.user_1.city)
        cy.get('[data-qa="zipcode"]').type(userData.user_1.zip_code)
        cy.get('[data-qa="mobile_number"]').type(userData.user_1.mobile)
        //complete the registration
        cy.get('[data-qa="create-account"]').click()

        //Verify that the user is logged in successfully
        cy.url().should('include', baseUrl + '/account_created')
        cy.get('#form').should('be.visible')
        cy.contains('Account Created!').should('be.visible')

        //Click on Continue
        cy.contains('Continue').click()

        //Wait for the new page to load and verify that the username is displayed
        cy.wait(1000)
        cy.contains(`Logged in as ${userData.user_1.user_full_name}`).should('be.visible')

        //Click on Cart and proceed to checkout
        cy.contains('Cart').click()
        cy.url().should('include', baseUrl + '/view_cart')
        cy.get('#cart_info').should('be.visible')
        cy.contains('Proceed To Checkout').click()

        //verify that the address details are displayed
        cy.get('#address_delivery').should('be.visible')
        cy.get('#address_delivery').find('.address_firstname').should('have.text', `${userData.user_1.salutation} ${userData.user_1.user_full_name}`)
        cy.get('#address_delivery').find('.address_address1').should('have.text', userData.user_1.address)
        cy.get('#address_delivery').then(($el) => {
            let text = $el.find('.address_city').text();
            text = text.replace(/[\n\t]/g, '').replace(/(\d+)/, ' $1')
            expect(text).to.equal(`${userData.user_1.city} ${userData.user_1.state} ${userData.user_1.zip_code}`)
        });
        cy.get('#address_delivery').find('.address_country_name').should('have.text', userData.user_1.country)
        cy.get('#address_delivery').find('.address_phone').should('have.text', userData.user_1.mobile)

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

        //Input payment details
        cy.get('[data-qa="name-on-card"]').type(paymentData.payment_1.cardholder_name)
        cy.get('[data-qa="card-number"]').type(paymentData.payment_1.card_number)
        cy.get('[data-qa="cvc"]').type(paymentData.payment_1.security_code)
        cy.get('[data-qa="expiry-month"]').type(paymentData.payment_1.expiration_month)
        cy.get('[data-qa="expiry-year"]').type(paymentData.payment_1.expiration_year)
        cy.get('[data-qa="pay-button"]').click()

        //Verify that payment is successful
        cy.url().should('include', baseUrl + '/payment_done')
        cy.get('#form').should('be.visible')
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
        cy.contains('Continue').click()
    })
})
