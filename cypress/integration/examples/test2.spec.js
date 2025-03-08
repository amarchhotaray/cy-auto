describe('Checkbox / Dropdown /  Test Suite', () => {
    beforeEach('Visit URL', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })
    it('Select Checkbox test', () => {
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('be.not.checked')

        cy.get('input[type="checkbox"]').check(['option2', 'option3'])
    })

    it('Select Dropdown test', () => {
        // Static dropdown
        cy.get('select').select('option2').should('have.value', 'option2')

        // Dynamic dropdown
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each(($ele, index, $list) => {
            if($ele.text() === 'India') {
                $ele.click()
            }
        })

        cy.get('#autocomplete').should('have.value', 'India')
    })

    it('Visibility test', () => {
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
    })

    it('Radio button test', () => {
        cy.get('input[value="radio2"]').check().should('be.checked')
    })

    it('Alert test', () => {
        cy.get('#alertbtn').click()
        cy.get('#confirmbtn').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })
        cy.on('window:confirm', (str) => {
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })
    })
})
