//login.cy.js -> cy.loginAs() -> cy.fixture(users.json) -> LoginPage -> UI

import LoginPage from "../../pages/LoginPage";


describe('Login Main App', () => {

  it.only('Login como admin', () => {
    // Llama al comando global que usa los datos del fixture
    cy.intercept('POST', 'https://stage.cloudsiteerp.com/api/login').as('loginRequest');
    cy.loginAs('admin');
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    LoginPage.checkLoginSuccess();
    cy.url().should('include', '/cotizaciones/crear-cotizacion');

    
    


    // Verifica que el login fue exitoso
  // cy.url().should('include', '/dashboard');
  });

  it('Login como usuario regular', () => {
    cy.loginAs('regular');
   // cy.url().should('include', '/dashboard');
  });

});
