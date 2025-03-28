import 'cypress-iframe'

describe('Multi Tab', () => {
    beforeEach('Visit URL', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })
    it('Verify Multi Tab', () => {
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find('a[href*="mentorship"]').eq(0).click()
        cy.wait(5000)
        cy.iframe().find("div[class*='pricing-header']",{timeout:120000}).should('have.length', 2)
    })

    it('Calender', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')
        const month = '6'
        const day = '15'
        const year = '2027'
        const expectedValue = [month,day,year]
        cy.get('.react-date-picker__inputGroup').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.contains('button',year).click()
        cy.get('.react-calendar__year-view__months__month').eq(Number(month)-1).click()
        cy.contains('abbr', day).click()

        // Assertion
        cy.get('.react-date-picker__inputGroup__input').each(($el, index) => {
            cy.wrap($el).invoke('val').should('eq', expectedValue[index])
        })
    })
})
