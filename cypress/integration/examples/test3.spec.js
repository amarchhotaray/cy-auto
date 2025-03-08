describe('Multi Tab', () => {
    beforeEach('Visit URL', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })
    it('Verify Multi Tab', () => {
        cy.get('#opentab').invoke('removeAttr', 'target').click()
        
        cy.origin('https://www.qaclickacademy.com/', () => {
            cy.url().should('include', 'qaclickacademy')

            cy.get("#navbarSupportedContent a[href^='about']").click()
            cy.url().should('include', 'about')
            // cy.go('back')
            cy.get('.mt-50 h2').should('contain', 'QAClick Academy')
        })
    })

    it('Verify Web Table', () => {
        cy.get("tr td:nth-child(2)").each(($el, index, $list) => {
          if ($el.text().includes("Python")) {
            cy.wrap($el).next().then((price) => {
              expect(price.text()).to.equal('25')
            })
          }
        })
    })

    it('Verify Mouse Hover', () => {
        cy.get('#mousehover').invoke('show') // this will not work because JQuery shows only the immediate child elements
        cy.get('.mouse-hover-content').invoke('show')
        cy.contains('Top').click() // { force: true } will fix for the hidden elements
        cy.url().should('include', 'top')
    })

    it('Multuple Window Handling', () => {
        // cy.get('#opentab').invoke('removeAttr', 'target').click()
        cy.get('#opentab').then(($el) => {
            const url = $el.prop('href')
            cy.visit(url)
            cy.origin(url, () => {
                cy.get("div.sub-menu-bar a[href*='about']").click()
            })
        })
    })
})
