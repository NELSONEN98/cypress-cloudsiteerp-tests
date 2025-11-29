class LoginPage {

    selectors = {
    usernameInput: '[placeholder="Nombre de usuario"]',
    passwordInput: '[placeholder="Contraseña"]',
    submitButton: 'button[type="submit"]',
    successToast: '.Toastify__toast--success',
    errorToast: '.Toastify__toast--error'
    }
    
    errorMessages = {
    emptyUsername: 'El usuario debe tener al menos 3 caracteres',
    emptyPassword: 'La contraseña debe tener al menos 8 caracteres',
    invalidCredentials: 'Error en el login. Verifica tus credenciales.',
    successLogin: 'Login exitoso!'
  };

   /**
   * Navega a la página de login
   */
    visit() {
        cy.visit('/');
    }

    /**
     * Llena el campo de usuario
     * @param {string} username - Nombre de usuario
     */
    fillUsername(username){
        cy.get(this.selectors.usernameInput).type(username);
    }

    /**
     * Llena el campo de contraseña
     * @param {string} password - Contraseña
     */
    fillPassword(password){
        cy.get(this.selectors.passwordInput).type(password);
    }

    /**
     * Envía el formulario de login
     */
    submit(){
        cy.get(this.selectors.submitButton).click();
    }

    /**
     * Verifica que el login sea exitoso
     */
    checkLoginSuccess(){
        cy.get(this.selectors.successToast,{timeout: 6000}).should('contain.text', this.errorMessages.successLogin);;
    }

    /**
     * Verifica que el login sea exitoso
     */
    checkLoginError(){
        cy.get(this.selectors.errorToast,{timeout: 6000}).should('contain.text', this.errorMessages.invalidCredentials);
    }

    /**
     * Verifica que el botón de login esté deshabilitado
     */
    checkButtonDisabled(){
        cy.get(this.selectors.submitButton).should('be.disabled');
    }

    /**
     * Verifica que el botón de login esté habilitado
     */
    checkButtonEnabled(){
        cy.get(this.selectors.submitButton).should('be.enabled');
    }

    /**
     * Verifica que el campo de usuario esté vacío
     */
    checkEmptyUsername(){
    cy.contains(this.errorMessages.emptyUsername)
      .should('be.visible');
    return this;
}

    /**
     * Verifica que el campo de contraseña esté vacío
     */
    checkEmptyPassword(){
    cy.contains(this.errorMessages.emptyPassword)
      .should('be.visible');
    return this;
}

}

export default new LoginPage();