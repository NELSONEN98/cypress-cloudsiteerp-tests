//login.cy.js -> cy.loginAs() -> cy.fixture(users.json) -> LoginPage -> UI

import LoginPage from "../../pages/LoginPage";


describe('Login Main App', () => {

  beforeEach(() =>{

    cy.intercept('POST', '**/api/login').as('loginRequest');
   // cy.intercept('POST', '**/api/login', (req)=>{
   //   console.log('Login request:', req);
  //  } ).as('loginRequest');

  })


  context('Login exitoso', () => {

    it('Debe permitir login como administrador', () => {
    // Llama al comando global que usa los datos del fixture
   
    cy.loginAs('admin');
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    LoginPage.checkLoginSuccess();
    cy.url().should('include', '/cotizaciones/crear-cotizacion');

    });

    //No hay usuario regular por el momento
    it.skip('Login como usuario regular', () => {
    cy.loginAs('regular');
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    LoginPage.checkLoginSuccess();
    cy.url().should('include', '/cotizaciones/crear-cotizacion');
  });


  })

  


  context('Login Fallido', () =>{
    it('Debe mostrar error con credenciales inválidas', () => {

      LoginPage.visit();
      LoginPage.fillUsername('wrong_user');
      LoginPage.fillPassword('wrong_password');
      LoginPage.submit();
      cy.wait('@loginRequest').its('response.statusCode').should('eq', 500);
      LoginPage.checkLoginError();
      
      
    })


  it('Debe validar campos vacíos', () =>{
    LoginPage.visit();
    LoginPage.submit();
    LoginPage.checkEmptyUsername();
    LoginPage.checkEmptyPassword();
  })

  it('Debe deshabilitar botón durante petición', () =>{
    cy.intercept('POST', '**/api/login', (req) =>{
      req.on('response', (res) =>{
        res.setDelay(2000);
      })
    }).as('loginRequestSlow');
    LoginPage.visit();
    LoginPage.fillUsername('wrong_user');
    LoginPage.fillPassword('wrong_password');
    LoginPage.submit();
    LoginPage.checkButtonDisabled();
    cy.wait('@loginRequestSlow');
    LoginPage.checkButtonEnabled();
    
    
  })


  })

   context('Sesión y Persistencia', () => {
    
    it('Debe mantener sesión después de recargar', () => {
      cy.loginAs('admin');
      cy.wait('@loginRequest');
      cy.get('[title="admin user"]', {timeout: 8000}).should('be.visible');
      cy.reload();
      
      // Debe seguir autenticado
      cy.url().should('not.include', '/login');
    });

  });

});
