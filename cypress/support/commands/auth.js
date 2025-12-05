       
import LoginPage from '../../pages/LoginPage';

Cypress.Commands.add('loginAs', (userRole) => {

    cy.fixture('users').then(users => {
        const user = users[userRole];
        if (!user)throw new Error(`User role "${userRole}" not found in users fixture`);
        cy.log(`Logging in as: ${userRole} (via UI)`);
    LoginPage.visit();
    LoginPage.fillUsername(user.username);
    LoginPage.fillPassword(user.password);
    LoginPage.submit();
    
        
    })
    
    

})




Cypress.Commands.add('loginWithSession', (userRole) => {
  cy.session(
    userRole,
    () => {
      cy.fixture('users').then(users => {
        const user = users[userRole];

        if (!user) {
          throw new Error(`User role "${userRole}" not found in users fixture`);
        }

        cy.log(`🔐 Creating session for: ${userRole}`);
        cy.log(`📧 Username: ${user.username}`);
        cy.log(`⚡ Using localStorage-only approach (skipping API)`);

        // Visitar la app para tener acceso a localStorage
        cy.visit('/');

        // Establecer el estado de autenticación directamente en localStorage
        cy.window().then((win) => {
          const userStorage = {
            state: { 
              role: user.role || 'tenantAdmin' 
            },
            version: 0
          };

          win.localStorage.setItem('user-storage', JSON.stringify(userStorage));
          cy.log('✅ User storage set in localStorage');
          cy.log(`📦 Role: ${user.role}`);
        });
      });
    },
    {
      validate() {
        cy.visit('/');
        cy.window().then((win) => {
          const userStorage = win.localStorage.getItem('user-storage');
          expect(userStorage).to.exist;

          const parsed = JSON.parse(userStorage);
          expect(parsed.state.role).to.exist;
          
          cy.log('✅ Session validated');
        });
      }
    }
  );
});

// Comando simplificado para login via localStorage
Cypress.Commands.add('loginViaLocalStorage', (userRole) => {
  cy.fixture('users').then(users => {
    const user = users[userRole];

    if (!user) {
      throw new Error(`User role "${userRole}" not found in users fixture`);
    }

    cy.log(`⚡ Setting up session for: ${userRole} (via localStorage)`);

    // Visitar la app primero para tener acceso a localStorage
    cy.visit('/');

    // Establecer el estado de autenticación directamente en localStorage
    cy.window().then((win) => {
      const userStorage = {
        state: {
          role: user.role || 'tenantAdmin'
        },
        version: 0
      };

      win.localStorage.setItem('user-storage', JSON.stringify(userStorage));
      cy.log('✅ User storage set in localStorage');
      cy.log(`📦 Role: ${user.role}`);
    });
  });
});



Cypress.Commands.add('loginWithSessionCache', (userRole) => {
  cy.session(
    userRole,
    () => {
      cy.fixture('users').then(users => {
        const user = users[userRole];
        
        if (!user) {
          throw new Error(`User role "${userRole}" not found in users fixture`);
        }

        cy.log(`🔐 Creating cached session for: ${userRole}`);
        
        cy.request({
          method: 'POST',
          url: 'https://stage.cloudsiteerp.com/api/login',
          body: {
            username: user.username,
            password: user.password
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.log('✅ Login successful - Cookie set automatically');
          
          // Establecer la cookie tenantRole para que el menú cargue correctamente
          const tenantRole = user.role || 'tenantAdmin';
          cy.setCookie('tenantRole', tenantRole, {
            domain: 'stage.cloudsiteerp.com',
            path: '/',
            secure: true,
            sameSite: 'Strict'
          });
          cy.log(`🍪 Cookie tenantRole set: ${tenantRole}`);
          
        });
        
      });
    },
    {
      validate() {
        // Validar que la sesión sigue válida
        cy.getCookie('accessToken').should('exist');
        cy.getCookie('tenantRole').should('exist');
      }
    }
  );
});