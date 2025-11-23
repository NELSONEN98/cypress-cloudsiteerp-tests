      
import LoginPage from '../../pages/LoginPage';

Cypress.Commands.add('loginAs', (userRole) => {

    cy.fixture('users').then(users => {
        const user = users[userRole];
        if (!user)throw new Error(`User role "${userRole}" not found in users fixture`);

    LoginPage.visit();
    LoginPage.fillUsername(user.username);
    LoginPage.fillPassword(user.password);
    LoginPage.submit();
    
        
    })
    
    

})