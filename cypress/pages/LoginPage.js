class LoginPage {
    visit() {
        cy.visit('/');
    }

    fillUsername(username){
        cy.get('[placeholder="Nombre de usuario"]').type(username);
    }

    fillPassword(password){
        cy.get('[placeholder="Contraseña"]').type(password);
    }

    submit(){
        cy.get('button[type="submit"]').click();
    }

    checkLoginSuccess(){
        cy.get('.Toastify__toast--success',{timeout: 6000}).should('contain.text', 'Login exitoso!');;
    }

}

export default new LoginPage();