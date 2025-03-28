describe('API Testing', () => {
  it('Passing query and path parameters', () => {
    const queryParam = { page: 2 }
    // URL : https://reqres.in/api/users?page=2
    cy.request({
          method: 'GET',
          url: 'https://reqres.in/api/users',
          qs: queryParam
        }).then((response) => {
        expect(response.status).equal(200)
                 
        expect(response.body.page).to.eq(2)
        expect(response.body.data).has.length(6)
        expect(response.body.data[0]).have.property('id',7);
        expect(response.body.data[0]).has.property('first_name','Michael');
    })
  })
})
