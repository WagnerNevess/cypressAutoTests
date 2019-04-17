const email = "desafio@pulsus.mobi";
const password = "FETJ^3Lw";
const randomValidator = Math.floor(Math.random() * 100000) + 1;

describe('List', function() {

  beforeEach(function() {
    cy.visit('https://contracts-app.herokuapp.com')
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('.actions > input').click();
  })

  it('List contract after create ', ()=> {
    cy.contains('ADD CONTRACT').should('to.have.length', 1).click();
    cy.get('form').find('#contract_vendor_id').select('Vodafone');
    cy.get('form').find('#contract_category_id').select('DSL');
    cy.get('input[id=contract_costs]').type(randomValidator);
    cy.get('input[id=contract_ends_on]').type('30');
    cy.get('.actions > input').click();
    cy.contains("$ "+(randomValidator)+".00").click();
  })
})
