class ProductPage {
    /**
     * Adds a product to the cart.
     *
     * @param {number} index - The index of the product to add to the cart.
     */
    addProductToCart(index) { // //Get the first product and click on Add to cart
        cy.get('.product-image-wrapper').then(($items) => {
            return cy.wrap($items[index]).contains('Add to cart').click()
        })
    }
}
export default ProductPage