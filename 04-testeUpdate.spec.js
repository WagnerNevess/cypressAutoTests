const email = "desafio@pulsus.mobi";
const password = "FETJ^3Lw";
const costNotNumber = "Costs is not a number";
const endInvalid = "Ends on is invalid";
const costBlank = "Costs can't be blank";
const endsWrong = "Ends on can't be in the past";
const randomValidator = parseInt(Math.floor(Math.random() * 100000) + 1);
const todayDate = parseInt(Cypress.moment().format('DD'));

describe('List', function() {

  beforeEach(function() {
    cy.visit('https://contracts-app.herokuapp.com')
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('.actions > input').click();
    cy.contains('ADD CONTRACT').should('to.have.length', 1).click();
    cy.get('form').find('#contract_vendor_id').select('Vodafone')
    cy.get('form').find('#contract_category_id').select('DSL')
  })


  it('Create and update contract - cost:invalid', ()=> {
    cy.get('input[id=contract_costs]').type(randomValidator);
    cy.get('input[id=contract_ends_on]').type('30');
    cy.get('.actions > input').click();
    cy.contains("$ "+(randomValidator)+".00").click();
    cy.get('form').find('#contract_vendor_id').select('Vattenfall')
    cy.get('form').find('#contract_category_id').select('Gas')
    cy.get('input[id=contract_costs]').clear().type("aaa");
    cy.get('input[id=contract_ends_on]').clear().type('30/10/2030')
    cy.get('.actions > input').click();
    cy.contains(costNotNumber).should('to.have.length', 1);
  })

  it('Create and update contract - cost:null', ()=> {
    cy.get('input[id=contract_costs]').type(randomValidator);
    cy.get('input[id=contract_ends_on]').type('30');
    cy.get('.actions > input').click();
    cy.contains("$ "+(randomValidator)+".00").click();
    cy.get('form').find('#contract_vendor_id').select('Vattenfall')
    cy.get('form').find('#contract_category_id').select('Gas')
    cy.get('input[id=contract_costs]').clear();
    cy.get('input[id=contract_ends_on]').clear().type('30/10/2030')
    cy.get('.actions > input').click();
    cy.contains(costBlank).should('to.have.length', 1);
  })

  it('Create and update contract - ends on:invalid', ()=> {
    cy.get('input[id=contract_costs]').type(randomValidator);
    cy.get('input[id=contract_ends_on]').type('30');
    cy.get('.actions > input').click();
    cy.contains("$ "+(randomValidator)+".00").click();
    cy.get('form').find('#contract_vendor_id').select('Vattenfall')
    cy.get('form').find('#contract_category_id').select('Gas')
    cy.get('input[id=contract_costs]').clear().type(randomValidator+1);
    cy.get('input[id=contract_ends_on]').clear().type('00')
    cy.get('.actions > input').click();
    cy.contains(endInvalid).should('to.have.length', 1);
  })


  it('Create and update contract - wrong date(past)', ()=> {
    cy.get('input[id=contract_costs]').type(randomValidator);
    cy.get('input[id=contract_ends_on]').type(todayDate+1);
    cy.get('.actions > input').click();
    cy.contains("$ "+(randomValidator)+".00").click();
    cy.get('form').find('#contract_vendor_id').select('Vattenfall')
    cy.get('form').find('#contract_category_id').select('Gas')
    cy.get('input[id=contract_costs]').clear().type(randomValidator+1);
    cy.get('input[id=contract_ends_on]').clear().type(todayDate-1)
    cy.get('.actions > input').click();
    cy.contains(endsWrong).should('to.have.length', 1);
  })

  it('Create and update contract - all:valid', ()=> {
    cy.get('input[id=contract_costs]').type(randomValidator);
    cy.get('input[id=contract_ends_on]').type('30');
    cy.get('.actions > input').click();
    cy.contains("$ "+(randomValidator)+".00").click();
    cy.get('form').find('#contract_vendor_id').select('Vattenfall')
    cy.get('form').find('#contract_category_id').select('Gas')
    cy.get('input[id=contract_ends_on]').clear().type('30/10/2030')
    cy.get('input[id=contract_costs]').clear().type(randomValidator+1);
    cy.get('.actions > input').click();
    cy.contains("$ "+(randomValidator+1)+".00").should('to.have.length', 1).click();
  })
})
