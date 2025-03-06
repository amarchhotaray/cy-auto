describe('My First Test', () => {
    it('My First Test Case', () => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      cy.get('input[type="search"]').type('ca')
      cy.wait(2000)
      cy.get('.product:visible').should('have.length', 4)

      // Parent child chaining
      cy.get('.products').find('.product').should('have.length', 4)

      // cy.get(':nth-child(3) > .product-action > button').click() // This is not a good practice
      cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()

      // using each
      cy.get('.products').find('.product').each(($ele, index, $list) => {
        const textVeg = $ele.find('h4.product-name').text()
        if(textVeg.includes('Cashews')) {
          cy.wrap($ele).find('button').click()
        }
      })

      cy.get('.brand').then((logoElement) => {
        cy.log(logoElement.text())
      })

      // assert if logo text is correctly displayed
      cy.get('.brand').should('have.text', 'GREENKART')

      // alias
      cy.get('.products').as('productLocator')
      cy.get('@productLocator').find('.product').eq(1).contains('ADD TO CART').click()
    })

    it('My Second Test Case', () => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      cy.get('input[type="search"]').type('ca')
      cy.wait(2000)

      cy.get('.products').as('productLocator')

      cy.get('@productLocator').find('.product').each(($ele, index, $list) => {
        const textVeg = $ele.find('h4.product-name').text()
        if(textVeg.includes('Cashews')) {
          cy.wrap($ele).find('button').click()
        }
      })

      // cy.get('@productLocator').find('.product').eq(1).contains('ADD TO CART').click()

      cy.get('.cart-icon > img').click()
      cy.contains('PROCEED TO CHECKOUT').click()
      cy.contains('Place Order').click()
    })
})