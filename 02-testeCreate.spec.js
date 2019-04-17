const email = "desafio@pulsus.mobi";
const password = "FETJ^3Lw";
const randomCost = Math.floor(Math.random() * 100000) + 1;
const todayDate = parseInt(Cypress.moment().format('DD'));
const truePageContracts = "My contracts";
const vendorNill = "Vendor must exist";
const categoryNill = "Category must exist";
const costBlank = "Costs can't be blank";
const endsBlank = "Ends on can't be blank";
const endInvalid = "Ends on is invalid";
const validCreate = "Your contract was added";
const costNotNumber = "Costs is not a number";
const endsWrong = "Ends on can't be in the past";

describe('Create', function() {

  beforeEach(function() {
    cy.visit('https://contracts-app.herokuapp.com');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('.actions > input').click();
    cy.contains(truePageContracts).should('to.have.length', 1);
    cy.contains('ADD CONTRACT').should('to.have.length', 1).click();
  })

  it('Add Contract - All null', ()=> {
    cy.get('.actions > input').click();
    cy.contains(vendorNill).should('to.have.length', 1);
    cy.contains(categoryNill).should('to.have.length', 1);
    cy.contains(costBlank).should('to.have.length', 1);
    cy.contains(endsBlank).should('to.have.length', 1);
    cy.contains(endInvalid).should('to.have.length', 1);
   cy.url().should('eq', 'https://contracts-app.herokuapp.com/contracts');
  })

  it('Add Contract - cost:true / all:null', ()=> {
    cy.get('input[id=contract_costs]').type(randomCost);
    cy.get('.actions > input').click();
    cy.contains(vendorNill).should('to.have.length', 1);
    cy.contains(categoryNill).should('to.have.length', 1);
    cy.contains(endsBlank).should('to.have.length', 1);
    cy.contains(endInvalid).should('to.have.length', 1);
    cy.url().should('eq', 'https://contracts-app.herokuapp.com/contracts');
  })

  it('Add Contract - Ends on:true / all:null', ()=> {
    cy.get('input[id=contract_ends_on]').type(todayDate+1);
    cy.get('.actions > input').click();
    cy.contains(vendorNill).should('to.have.length', 1);
    cy.contains(costBlank).should('to.have.length', 1);
    cy.contains(categoryNill).should('to.have.length', 1);
    cy.contains(costBlank).should('to.have.length', 1);
    cy.url().should('eq', 'https://contracts-app.herokuapp.com/contracts');
  })

  it('Add Contract - ends on:invalid / all:ok', ()=> {
    cy.get('form').find('#contract_vendor_id').select('Vodafone');
    cy.get('input[id=contract_costs]').type(randomCost);
    cy.get('input[id=contract_ends_on]').type('aaa');
    cy.get('.actions > input').click();
    cy.contains(endInvalid).should('to.have.length', 1);
    cy.url().should('eq', 'https://contracts-app.herokuapp.com/contracts');
  })

  it('Add Contract - ends on:invalid(past) / all:ok', ()=> {
    cy.get('form').find('#contract_vendor_id').select('Vodafone');
    cy.get('input[id=contract_costs]').type(randomCost);
    cy.get('input[id=contract_ends_on]').type(todayDate-1);
    cy.get('.actions > input').click();
    cy.contains(endsWrong).should('to.have.length', 1);
    cy.url().should('eq', 'https://contracts-app.herokuapp.com/contracts');
  })

  it('Add Contract - cost:invalid / all:ok', ()=> {
    cy.get('form').find('#contract_vendor_id').select('Vodafone');
    cy.get('input[id=contract_costs]').type('aa');
    cy.get('input[id=contract_ends_on]').type(todayDate+1);
    cy.get('.actions > input').click();
    cy.contains(costNotNumber).should('to.have.length', 1);
    cy.url().should('eq', 'https://contracts-app.herokuapp.com/contracts');
  })

  it('Add Contract - all:valid', ()=> {
    cy.get('form').find('#contract_vendor_id').select('Vodafone');
    cy.get('form').find('#contract_category_id').select('Internet');
    cy.get('input[id=contract_costs]').type(randomCost);
    cy.get('input[id=contract_ends_on]').type(todayDate+1);
    cy.get('.actions > input').click();
    cy.contains(validCreate).should('to.have.length', 1);
    cy.url().should('eq', 'https://contracts-app.herokuapp.com/contracts');
  })

})
