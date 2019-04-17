const email = "desafio@pulsus.mobi";
const password = "FETJ^3Lw";
const trueLogin = "Welcome back, Pulsus";
const failLogin = "We weren't able to find a user with the specified email and password combination";

describe('Login', function() {

  beforeEach(function() {
    cy.visit('https://contracts-app.herokuapp.com/signin')
  })

  it('Login to aplication - email:true / pass:true - not register', ()=> {
    cy.get('input[name=email]').type("teste@teste.com");
    cy.get('input[name=password]').type('PassTest');
    cy.get('.actions > input').click();
    cy.contains(failLogin).should('to.have.length', 1)
    cy.url().should('eq', 'https://contracts-app.herokuapp.com/signin')
  })

  it('Login to aplication - email:null / pass:true', ()=> {
    cy.get('input[name=password]').type('PassTest');
    cy.get('.actions > input').click();
    cy.contains(failLogin).should('to.have.length', 1)
    cy.url().should('eq', 'https://contracts-app.herokuapp.com/signin')
  })

  it('Login to aplication - email:true / pass:null', ()=> {
    cy.get('input[name=email]').type("teste@teste.com");
    cy.get('.actions > input').click();
    cy.contains(failLogin).should('to.have.length', 1)
    cy.url().should('eq', 'https://contracts-app.herokuapp.com/signin')
  })

  it('Login to aplication - all:null', ()=> {
    cy.get('.actions > input').click();
    cy.contains(failLogin).should('to.have.length', 1)
    cy.url().should('eq', 'https://contracts-app.herokuapp.com/signin')
  })

  it('Login to aplication - email:true / pass:wrong', ()=> {
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type('12345');
    cy.get('.actions > input').click();
    cy.contains(failLogin).should('to.have.length', 1)
    cy.url().should('eq', 'https://contracts-app.herokuapp.com/signin')
  })

  it('Login to aplication - email:true / pass:true', ()=> {
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('.actions > input').click();
    cy.contains(trueLogin).should('to.have.length', 1)
  })
})
