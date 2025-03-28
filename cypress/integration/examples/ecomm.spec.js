describe('e2e e-commerce test', () => {
    it('Submit order', () => {
        let fixData
        cy.fixture('example').then((data) => {
            fixData=data
        })
        cy.visit('https://rahulshettyacademy.com/loginpagePractise/#')
        // const productName = 'Nokia Edge'

        cy.get('#username').type(fixData.username)
        cy.get('#password').type(fixData.password)
        cy.contains('Sign In').click()
        cy.contains('Shop Name').should('be.visible')
        cy.get('app-card').should('have.length', 4)

        cy.get('app-card').filter(`:contains(${fixData.productName})`).contains('Add').click()

        cy.get('app-card').eq(0).contains('button', 'Add').click()
        cy.contains('a', 'Checkout').click()
        let sum = 0
        cy.get('tr td:nth-child(4) strong').each(($ele) => {
            const amount = Number($ele.text().split(' ')[1].trim())
            sum = sum + amount
        }).then(() => {
            expect(sum).to.lessThan(200000)
        })

        cy.contains('Checkout').click()
        cy.get('#country').type('India')
        cy.get('.suggestions ul li a').click()
        cy.get('.btn-success').click()
        cy.get('.alert-success').should('contain', 'Success')
    })
})
