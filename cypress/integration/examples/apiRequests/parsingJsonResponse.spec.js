describe('API Test', () => {
  it('Should parse JSON response', () => {
    cy.request({
        method: 'GET',
        url: 'https://fakestoreapi.com/products',
        qs: { limit : 5 }
    })
    .then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.length(5)
        expect(response.body[0].id).to.equal(1)
        expect(response.body[0].title).to.equal('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
        expect(response.body[0].category).to.equal('men\'s clothing')
        expect(response.body[0].rating.rate).to.equal(3.9)

        expect(response.body[4].id).to.equal(5)
        expect(response.body[4].title).to.equal('John Hardy Women\'s Legends Naga Gold & Silver Dragon Station Chain Bracelet');
        expect(response.body[4].rating.rate).to.equal(4.6)
    })
  })

  it('Parsing Json response -find total price of products', () => {
    let totalprice=0
    cy.request({
        method: 'GET',
        url: 'https://fakestoreapi.com/products',
        qs: { limit : 5 }
    }).then((response) => {
        response.body.forEach(element => {
            totalprice=totalprice+element.price
        })
        expect(totalprice).to.equal(899.23); // limit = 5
        })
    })
})
